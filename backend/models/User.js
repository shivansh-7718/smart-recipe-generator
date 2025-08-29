// backend/models/User.js 
const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  ratings: [{ 
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, 
    rating: { type: Number, min: 1, max: 5 } 
  }], 
  dietaryPreferences: [String], 
  createdAt: { type: Date, default: Date.now } 
}); 
  
  module.exports = mongoose.model("User", UserSchema);
