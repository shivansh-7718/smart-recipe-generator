// // backend/routes/recipes.js

const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Normalizer used by search helper and route
const normalize = (s) => {
  if (!s) return "";
  let t = String(s).toLowerCase().trim();
  t = t.replace(/[^\w\s]/g, ""); // remove punctuation
  if (t.length > 3) {
    if (t.endsWith("es")) t = t.slice(0, -2);
    else if (t.endsWith("s")) t = t.slice(0, -1);
  }
  t = t.replace(/\s+/g, " ").trim();
  return t;
};

// Exportable search helper: ingredientsArray -> { success: true, results: [...] }
async function searchRecipesByIngredients(ingredientsArray = [], options = {}) {
  const { diet = "any", maxTime } = options || {};

  const provided = Array.isArray(ingredientsArray)
    ? ingredientsArray.map((x) => normalize(x)).filter(Boolean)
    : [normalize(String(ingredientsArray))].filter(Boolean);

  const filter = {};
  if (diet && String(diet).toLowerCase() !== "any") {
    filter.dietary = String(diet).toLowerCase();
  }
  if (maxTime) filter.cookTimeMin = { $lte: Number(maxTime) };

  const candidates = await Recipe.find(filter).lean();

  const scored = candidates.map((r) => {
    const recipeIngredients = (r.rawIngredients || [])
      .map((x) => normalize(x))
      .filter(Boolean);

    let matchedCount = 0;
    for (const recIng of recipeIngredients) {
      for (const prov of provided) {
        if (!recIng || !prov) continue;
        if (recIng === prov || recIng.includes(prov) || prov.includes(recIng)) {
          matchedCount++;
          break;
        }
      }
    }

    const missing = Math.max(0, recipeIngredients.length - matchedCount);
    const coverage =
      recipeIngredients.length === 0 ? 0 : matchedCount / recipeIngredients.length;

    return { recipe: r, matched: matchedCount, missing, coverage };
  });

  const results = scored
    // ❌ removed maxMissing filter so all recipes are included
    .sort((a, b) => {
      if (b.coverage !== a.coverage) return b.coverage - a.coverage;
      if (a.missing !== b.missing) return a.missing - b.missing;
      return b.matched - a.matched;
    })
    .map((s) => ({
      ...s.recipe,
      matched: s.matched,
      missing: s.missing,
      coverage: s.coverage,
    }));

  return { success: true, results };
}

// GET /api/recipes - list + basic query support
router.get("/", async (req, res) => {
  try {
    const { q, diet, maxTime, difficulty, limit = 50 } = req.query;
    const filter = {};
    if (diet && diet !== "any") filter.dietary = diet;
    if (difficulty && difficulty !== "Any") filter.difficulty = difficulty;
    if (maxTime) filter.cookTimeMin = { $lte: Number(maxTime) };
    if (q) filter.name = new RegExp(q, "i");

    const recipes = await Recipe.find(filter).limit(Number(limit));
    res.json({ success: true, data: recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/recipes/search - uses helper
router.post("/search", async (req, res) => {
  try {
    const { ingredients = [], diet = "any", maxTime } = req.body || {};
    const resp = await searchRecipesByIngredients(ingredients, { diet, maxTime });
    res.json(resp);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Search error" });
  }
});

// GET /api/recipes/:id
router.get("/:id", async (req, res) => {
  try {
    const r = await Recipe.findById(req.params.id);
    if (!r) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: r });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
// export helper so other routes can call it
module.exports.searchRecipesByIngredients = searchRecipesByIngredients;
