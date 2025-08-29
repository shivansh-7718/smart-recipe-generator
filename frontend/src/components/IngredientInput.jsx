// import React, { useState } from "react";

// export default function IngredientInput({ onSearch, loading }) {
//   const [text, setText] = useState("");
//   const [diet, setDiet] = useState("any");

//   const handleSearch = () => {
//     const tokens = text
//       .split(/[,;\n]/)
//       .map(s => s.trim())
//       .filter(Boolean);
//     onSearch(tokens, { diet }); // maxMissing removed
//   };

//   return (
//     <div className="ingredient-input">
//       <label>Search ingredients</label>
//       <textarea
//         rows={3}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="e.g. tomato, onion, rice, potato"
//       />
//       <div className="row">
//         <div>
//           <label>Diet</label>
//           <select value={diet} onChange={(e) => setDiet(e.target.value)}>
//             <option value="any">Any</option>
//             <option value="vegetarian">Vegetarian</option>
//             <option value="vegan">Vegan</option>
//             <option value="glutenfree">Gluten-free</option>
//           </select>
//         </div>
//       </div>
//       <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//         <button onClick={handleSearch} disabled={loading}>
//           {loading ? "Searching..." : "Search Recipes"}
//         </button>
//         <button onClick={() => { setText(""); setDiet("any"); }}>
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function IngredientInput({ onSearch, loading }) {
  const [text, setText] = useState("");
  const [diet, setDiet] = useState("any");
  const [maxTime, setMaxTime] = useState(""); // ✅ new state

  const handleSearch = () => {
    const tokens = text
      .split(/[,;\n]/)
      .map(s => s.trim())
      .filter(Boolean);
    onSearch(tokens, { diet, maxTime: maxTime ? Number(maxTime) : undefined }); // ✅ pass maxTime
  };

  return (
    <div className="ingredient-input">
      <label>Search ingredients</label>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. tomato, onion, rice, potato"
      />
      <div className="row" style={{ gap: 16 }}>
        <div>
          <label>Diet</label>
          <select value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="any">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="glutenfree">Gluten-free</option>
          </select>
        </div>

        <div>
          <label>Max Cooking Time (minutes)</label>
          <input
            type="number"
            min="1"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            placeholder="e.g. 30"
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search Recipes"}
        </button>
        <button onClick={() => { setText(""); setDiet("any"); setMaxTime(""); }}>
          Clear
        </button>
      </div>
    </div>
  );
}
