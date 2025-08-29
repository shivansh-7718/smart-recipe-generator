
// backend/routes/ingredients.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { searchRecipesByIngredients } = require("./recipes"); // helper exported below

const router = express.Router();

// ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const name = `${Date.now()}-${Math.round(Math.random()*1e6)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

// POST /api/ingredients/recognize
// Accepts multipart/form-data field "image" and optional diet,maxTime
router.post("/recognize", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });

    // === STUB recognizer ===
    // (Replace this block with a real vision call later)
    const fname = (req.file.originalname || "").toLowerCase();
    const tokens = fname.split(/[\-_.,\s]+/).map(t => t.replace(/\W/g,'')).filter(Boolean);

    const known = ["tomato","onion","garlic","potato","carrot","chicken","cheese","milk","egg","rice","spinach","pepper","salt","oil","butter","beans","lentil"];
    let detected = [];

    for (const k of known) {
      if (tokens.some(t => t.includes(k) || k.includes(t))) detected.push(k);
    }
    if (detected.length === 0) detected = ["tomato","onion","salt"]; // fallback

    const detectedWithConfidence = detected.map((d, i) => ({ name: d, confidence: Math.max(0.5, 1 - i*0.12) }));

    // reuse recipe search helper
    const diet = req.body.diet || "any";
    const maxTime = req.body.maxTime !== undefined ? Number(req.body.maxTime) : undefined;

    const searchResp = await searchRecipesByIngredients(
      detected.map(d => d.toLowerCase()),
      { diet, maxTime } // maxMissing removed
    );

    return res.json({
      success: true,
      detected: detectedWithConfidence,
      results: searchResp.results || []
    });
  } catch (err) {
    console.error("Ingredient recognition error:", err);
    res.status(500).json({ success: false, message: "Recognition error" });
  }
});

module.exports = router;
