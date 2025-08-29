


const express = require("express");
const User = require("../models/User");
const Recipe = require("../models/Recipe");

const router = express.Router();

/// ✅ Toggle favorite (add/remove)
router.post("/favorite", async (req, res) => {
  try {
    const { email, recipeId } = req.body;
    if (!email || !recipeId)
      return res.status(400).json({ success: false, message: "email & recipeId required" });

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    const exists = user.favorites.some(f => f.toString() === recipeId);
    if (exists) {
      user.favorites = user.favorites.filter(f => f.toString() !== recipeId);
    } else {
      user.favorites.push(recipeId);
    }
    await user.save();

    // ✅ repopulate favorites before sending
    await user.populate("favorites");

    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});


// ✅ Identify or create user
router.post("/identify", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, favorites: [], ratings: [] });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Identify error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all favorites (populated with recipe data)
router.get("/:email/favorites", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate("favorites");
    if (!user) return res.json({ success: true, favorites: [] });
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get recommendations based on favorites (ingredient overlap, sorted by overlap count)
router.get("/:email/recommendations", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate("favorites");
    if (!user || user.favorites.length === 0) return res.json({ success: true, recommendations: [] });

    // Collect unique ingredients from favorites
    const favoriteIngredients = Array.from(
      new Set(user.favorites.flatMap(r => r.rawIngredients || []))
    );

    // Find recipes sorted by ingredient overlap (exclude favorites)
    const recommendations = await Recipe.aggregate([
      { $match: { _id: { $nin: user.favorites.map(r => r._id) } } },
      {
        $addFields: {
          overlapCount: {
            $size: { $setIntersection: ["$rawIngredients", favoriteIngredients] }
          }
        }
      },
      { $match: { overlapCount: { $gt: 0 } } },
      { $sort: { overlapCount: -1 } },
      { $limit: 20 }
    ]);

    res.json({ success: true, recommendations });
  } catch (err) {
    console.error("Recommendations error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

