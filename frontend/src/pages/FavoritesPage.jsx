// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import {
  getFavorites,
  getRecommendations,
  toggleFavorite,
  rateRecipe,
} from "../api/users";

export default function FavoritesPage({ email }) {
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // fetch favorites + recommendations whenever email changes
  useEffect(() => {
    if (!email) return;

    (async () => {
      const favResp = await getFavorites(email);
      if (favResp.success) setFavorites(favResp.favorites || []);

      const recResp = await getRecommendations(email);
      if (recResp.success) setRecommendations(recResp.recommendations || []);
    })();
  }, [email]);

  const handleFavorite = async (recipeId) => {
    if (!email) return alert("Set your email first.");

    // Optimistic update: remove locally first
    setFavorites((prev) =>
      prev.filter((r) => r._id !== recipeId)
    );

    const r = await toggleFavorite(email, recipeId);
    if (r.success && r.favorites) {
      // Ensure local state matches backend response
      setFavorites(r.favorites);
    } else {
      alert("Favorite toggle failed");
      // reload in case of error
      const favResp = await getFavorites(email);
      if (favResp.success) setFavorites(favResp.favorites || []);
    }
  };

  const handleRate = async (recipeId, rating) => {
    if (!email) return alert("Set your email first.");
    const r = await rateRecipe(email, recipeId, rating);
    if (!r.success) alert("Rating failed");
  };

  return (
    <div className="favorites-page">
      {/* Favorites Section */}
      <h2>Your Favorites ({favorites.length})</h2>
      <div className="results-grid">
        {favorites.map((r) => (
          <RecipeCard
            key={r._id}
            recipe={{ ...r, isFavorite: true }}  // ✅ mark as favorite
            onFavorite={handleFavorite}
            onRate={handleRate}
            userEmail={email}
          />
        ))}
        {favorites.length === 0 && (
          <div className="empty">No favorites yet.</div>
        )}
      </div>

      {/* Recommendations Section */}
      <h2>Recommended Recipes ({recommendations.length})</h2>
      <div className="results-grid">
        {recommendations.map((r) => (
          <RecipeCard
            key={r._id}
            recipe={{ ...r, isFavorite: false }}  // ✅ not favorited yet
            onFavorite={handleFavorite}
            onRate={handleRate}
            userEmail={email}
          />
        ))}
        {recommendations.length === 0 && (
          <div className="empty">
            No recommendations yet. Add some favorites first!
          </div>
        )}
      </div>
    </div>
  );
}

