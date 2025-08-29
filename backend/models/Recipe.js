// backend/models/Recipe.js
const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
  calories: Number,
  protein_g: Number,
  carbs_g: Number,
  fat_g: Number,
}, { _id: false });

const IngredientSchema = new mongoose.Schema({ 
  name: { type: String, required: true }, 
  amount: { type: Number, required: true }, // ✅ number for scaling 
  unit: { type: String } // e.g. g, cups, tbsp 
}, 
{ _id: false });



const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [IngredientSchema],
  rawIngredients: [String], // normalized ingredient list for matching
  steps: [String],
  servings: { type: Number, default: 2 },
  cookTimeMin: { type: Number, default: 0 },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  nutrition: NutritionSchema,
  dietary: [String],
  cuisine: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
