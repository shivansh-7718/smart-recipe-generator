// src/api/recipes.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ Search recipes by ingredients (maxMissing removed)
export async function searchRecipes(ingredients = [], opts = {}) {
  try {
    const res = await axios.post(`${API}/api/recipes/search`, {
      ingredients,
      diet: opts.diet || "any",
      maxTime: opts.maxTime
    });
    return res.data;
  } catch (err) {
    console.error("searchRecipes error:", err?.response?.data || err.message);
    return { success: false, error: err?.response?.data || err.message };
  }
}

// ✅ List recipes
export async function listRecipes(limit = 50) {
  try {
    const res = await axios.get(`${API}/api/recipes?limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("listRecipes error:", err?.response?.data || err.message);
    return { success: false, error: err?.message };
  }
}
