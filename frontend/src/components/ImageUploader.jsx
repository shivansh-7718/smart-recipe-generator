// import React, { useState } from "react";
// import axios from "axios";

// export default function ImageUploader({ onResults }) {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [detected, setDetected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [diet, setDiet] = useState("any");

//   const chooseFile = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const upload = async () => {
//     if (!file) return alert("Select an image first");
//     setLoading(true);
//     const form = new FormData();
//     form.append("image", file);
//     form.append("diet", diet);
//     // maxMissing removed

//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/ingredients/recognize`,
//         form,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (data.success) {
//         setDetected(data.detected || []);
//         if (onResults) onResults(data.results || []); // 👈 scroll App.jsx se hoga
//       } else alert("Recognition failed");
//     } catch (err) {
//       console.error(err);
//       alert("Upload error, check console");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeDetected = (name) => {
//     setDetected(detected.filter((d) => d.name !== name));
//   };

//   return (
//     <div className="inputs">
//       {/* Upload Section */}
//       <div className="upload-section">
//         <label className="section-title">📸 Upload ingredient photo</label>
//         <div className="file-input-wrapper">
//           <input
//             type="file"
//             id="fileUpload"
//             accept="image/*"
//             onChange={chooseFile}
//           />
//           <label htmlFor="fileUpload" className="upload-btn">
//             Choose File
//           </label>
//           <span className="file-name">
//             {file ? file.name : "No file chosen"}
//           </span>
//         </div>
//         {preview && (
//           <img
//             src={preview}
//             alt="preview"
//             className="preview-img"
//           />
//         )}
//       </div>

//       {/* Options Section */}
//       <div className="options-row">
//         <div className="option">
//           <label>Diet</label>
//           <select
//             value={diet}
//             onChange={(e) => setDiet(e.target.value)}
//           >
//             <option value="any">Any</option>
//             <option value="vegetarian">Vegetarian</option>
//             <option value="vegan">Vegan</option>
//             <option value="glutenfree">Gluten-free</option>
//           </select>
//         </div>
//       </div>

//       {/* Upload Button */}
//       <button onClick={upload} disabled={loading} className="main-btn">
//         {loading ? "Uploading..." : "🔎 Upload & Find Recipes"}
//       </button>

//       {/* Detected Ingredients */}
//       {detected.length > 0 && (
//         <div className="detected-box">
//           <strong>Detected Ingredients:</strong>
//           <div className="tags">
//             {detected.map((d) => (
//               <span key={d.name} className="tag">
//                 {d.name} ({Math.round((d.confidence || 1) * 100)}%)
//                 <button className="remove-tag" onClick={() => removeDetected(d.name)}>×</button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";

export default function ImageUploader({ onResults }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detected, setDetected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [diet, setDiet] = useState("any");
  const [maxTime, setMaxTime] = useState(""); // ✅ new state for max cook time

  const chooseFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const upload = async () => {
    if (!file) return alert("Select an image first");
    setLoading(true);
    const form = new FormData();
    form.append("image", file);
    form.append("diet", diet);
    if (maxTime) form.append("maxTime", maxTime); // ✅ send maxTime to backend

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/ingredients/recognize`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        setDetected(data.detected || []);
        if (onResults) onResults(data.results || []);
      } else alert("Recognition failed");
    } catch (err) {
      console.error(err);
      alert("Upload error, check console");
    } finally {
      setLoading(false);
    }
  };

  const removeDetected = (name) => {
    setDetected(detected.filter((d) => d.name !== name));
  };

  return (
    <div className="inputs">
      {/* Upload Section */}
      <div className="upload-section">
        <label className="section-title">📸 Upload ingredient photo</label>
        <div className="file-input-wrapper">
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={chooseFile}
          />
          <label htmlFor="fileUpload" className="upload-btn">
            Choose File
          </label>
          <span className="file-name">
            {file ? file.name : "No file chosen"}
          </span>
        </div>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="preview-img"
          />
        )}
      </div>

      {/* Options Section */}
      <div className="options-row">
        <div className="option">
          <label>Diet</label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="glutenfree">Gluten-free</option>
          </select>
        </div>

        <div className="option">
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

      {/* Upload Button */}
      <button onClick={upload} disabled={loading} className="main-btn">
        {loading ? "Uploading..." : "🔎 Upload & Find Recipes"}
      </button>

      {/* Detected Ingredients */}
      {detected.length > 0 && (
        <div className="detected-box">
          <strong>Detected Ingredients:</strong>
          <div className="tags">
            {detected.map((d) => (
              <span key={d.name} className="tag">
                {d.name} ({Math.round((d.confidence || 1) * 100)}%)
                <button className="remove-tag" onClick={() => removeDetected(d.name)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
