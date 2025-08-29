import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function identifyUser(email) {
  try {
    const res = await axios.post(`${API}/api/users/identify`, { email });
    return res.data;
  } catch (err) {
    console.error("identifyUser error:", err?.response?.data || err.message);
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function toggleFavorite(email, recipeId) {
  try {
    const res = await axios.post(`${API}/api/users/favorite`, { email, recipeId });
    return res.data;
  } catch (err) {
    console.error("toggleFavorite error:", err?.response?.data || err.message);
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function rateRecipe(email, recipeId, rating) {
  try {
    const res = await axios.post(`${API}/api/users/rate`, { email, recipeId, rating });
    return res.data;
  } catch (err) {
    console.error("rateRecipe error:", err?.response?.data || err.message);
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function getFavorites(email) {
  try {
    const res = await axios.get(`${API}/api/users/${email}/favorites`);
    return res.data;
  } catch (err) {
    console.error("getFavorites error:", err?.response?.data || err.message);
    return { success: false, error: err?.response?.data || err.message };
  }
}

export async function getRecommendations(email) {
  try {
    const res = await axios.get(`${API}/api/users/${email}/recommendations`);
    return res.data;
  } catch (err) {
    console.error("getRecommendations error:", err?.response?.data || err.message);
    return { success: false, error: err?.response?.data || err.message };
  }
}

