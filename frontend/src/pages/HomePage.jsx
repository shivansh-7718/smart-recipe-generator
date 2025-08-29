import React, { useEffect, useState, useRef } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import ImageUploader from "../components/ImageUploader";
import { searchRecipes, listRecipes } from "../api/recipes";
import { toggleFavorite, rateRecipe } from "../api/users";

export default function HomePage({ email }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef(null);

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    (async () => {
      const r = await listRecipes(12);
      if (r.success) setRecipes(r.data || []);
    })();
  }, []);

  const filterZeroMatch = (recipeArray) =>
    (recipeArray || []).filter((r) => (r.coverage || 0) > 0);

  const handleSearch = async (ingredients, opts) => {
    setLoading(true);
    const resp = await searchRecipes(ingredients, opts); // maxMissing not sent anymore
    setLoading(false);
    if (resp.success) {
      const filtered = filterZeroMatch(resp.results);
      setRecipes(filtered);
      scrollToResults();
    } else alert("Search failed: " + (resp.error || "unknown"));
  };

  const handleImageResults = (results) => {
    const filtered = filterZeroMatch(results);
    setRecipes(filtered);
    scrollToResults();
  };

  const handleFavorite = async (recipeId) => {
    if (!email) return alert("Set your email first.");
    const r = await toggleFavorite(email, recipeId);
    if (r.success) alert("Favorites updated");
    else alert("Favorite failed");
  };

  const handleRate = async (recipeId, rating) => {
    if (!email) return alert("Set your email first.");
    const r = await rateRecipe(email, recipeId, rating);
    if (r.success) alert("Thanks for rating!");
    else alert("Rating failed");
  };

  return (
    <div>
      {/* Input Section */}
      <section className="inputs">
        <ImageUploader onResults={handleImageResults} />
        <IngredientInput onSearch={handleSearch} loading={loading} />
      </section>

      {/* Results Section */}
      <section className="results" ref={resultsRef}>
        <h2>Results ({recipes.length})</h2>
        <div className="results-grid">
          {recipes.map((r) => (
            <RecipeCard
              key={r._id || r.name}
              recipe={r}
              onFavorite={handleFavorite}
              onRate={handleRate}
              userEmail={email}
            />
          ))}
          {recipes.length === 0 && (
            <div className="empty">No recipes — try another ingredient set.</div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <small>
          Built for assignment — shows match score, favorite & rating hooks.
        </small>
      </footer>
    </div>
  );
}
