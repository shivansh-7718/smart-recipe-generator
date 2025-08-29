
import React, { useState, useEffect } from "react";

export default function RecipeCard({ recipe, onFavorite, onRate, userEmail }) {
  const [rating, setRating] = useState(null);
  const [favLoading, setFavLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ✅ Servings state
  const [servings, setServings] = useState(recipe.servings || 2);

  // ✅ Track favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // check if recipe is marked as favorite from parent
    if (recipe.isFavorite) {
      setIsFavorite(true);
    }
  }, [recipe]);

  // ✅ Handle Favorite toggle
  const handleFavorite = async () => {
    if (!userEmail) return alert("Please set your email (top-right) to favorite.");
    setFavLoading(true);

    // optimistic toggle
    setIsFavorite((prev) => !prev);

    const res = await onFavorite(recipe._id);
    if (res && res.success && res.favorites) {
      // verify with backend response
      const stillFavorite = res.favorites.includes(recipe._id);
      setIsFavorite(stillFavorite);
    }

    setFavLoading(false);
  };

  // ✅ Handle Rating
  const handleRate = async (r) => {
    if (!userEmail) return alert("Please set your email (top-right) to rate.");
    setRateLoading(true);
    setRating(r);
    await onRate(recipe._id, r);
    setRateLoading(false);
  };

  // ✅ Scale ingredient amounts dynamically
  const getScaledIngredients = () => {
    return (recipe.ingredients || []).map((i) => {
      if (i.quantity) {
        const match = i.quantity.match(/^([\d/.]+)\s*(.*)$/);
        if (match) {
          let num = match[1];
          let unit = match[2] || "";

          let value;
          try {
            value = eval(num.replace(/(\d+)\/(\d+)/, "($1/$2)"));
          } catch {
            value = parseFloat(num);
          }

          if (!isNaN(value)) {
            const scaledValue = (value * (servings / recipe.servings)).toFixed(2);
            return `${scaledValue.replace(/\.00$/, "")} ${unit} ${i.name}`;
          }
        }
        return `${i.quantity} ${i.name}`;
      }
      return i.name || "";
    });
  };

  return (
    <>
      {/* Card */}
      <div className="card" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
        <div className="card-title">{recipe.name}</div>

        {/* Recipe Image */}
        {recipe.imageUrl && (
          <div className="card-image">
            <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
        )}

        {/* Info below image */}
        <div className="card-info">
          <div className="meta">
            {recipe.cuisine} • {recipe.difficulty} • {recipe.cookTimeMin} min
          </div>
          <div className="desc">{recipe.description || recipe.steps?.[0] || ""}</div>
          <div className="ingredients">
            <strong>Ingredients:</strong>{" "}
            {(recipe.ingredients || []).slice(0, 6).map((i) => i.name || i).join(", ")}...
          </div>
          <div className="match">
            Match: <strong>{Math.round((recipe.coverage || 0) * 100)}%</strong> • Missing:{" "}
            <strong>{recipe.missing ?? 0}</strong>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

            {/* Modal Image */}
            {recipe.imageUrl && (
              <div className="modal-image">
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
            )}

            {/* Title + Meta */}
            <h2>{recipe.name}</h2>
            <div>
              <strong>Cuisine:</strong> {recipe.cuisine} •{" "}
              <strong>Difficulty:</strong> {recipe.difficulty} •{" "}
              <strong>Time:</strong> {recipe.cookTimeMin} min
            </div>

            {/* ✅ Servings selector */}
            <div style={{ margin: "10px 0" }}>
              <label>
                Servings:{" "}
                <input
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  style={{ width: "60px", marginLeft: "8px" }}
                />
              </label>
            </div>

            {/* Ingredients */}
            <h3>Ingredients:</h3>
            <ul>
              {getScaledIngredients().map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>

            {/* Steps */}
            <h3>Instructions:</h3>
            <ol>
              {(recipe.steps || []).map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>

            {/* Nutrition */}
            <h3>Nutrition:</h3>
            <div>
              Calories: {recipe.nutrition?.calories ?? "-"} kcal<br />
              Protein: {recipe.nutrition?.protein_g ?? "-"} g<br />
              Carbs: {recipe.nutrition?.carbs_g ?? "-"} g<br />
              Fat: {recipe.nutrition?.fat_g ?? "-"} g
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button onClick={handleFavorite} disabled={favLoading}>
                {favLoading ? "..." : isFavorite ? "Remove Favorite" : "Add Favorite"}
              </button>
              <div className="rating">
                Rate:
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleRate(n)}
                    disabled={rateLoading}
                    className={rating === n ? "active" : ""}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

