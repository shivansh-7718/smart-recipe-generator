// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import "./styles.css";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import { identifyUser } from "./api/users";

export default function App() {
  const [email, setEmail] = useState(localStorage.getItem("sr_user_email") || "");

  const handleSetEmail = async () => {
    if (!email) return alert("Enter an email to identify yourself.");
    const r = await identifyUser(email);
    if (r.success) {
      localStorage.setItem("sr_user_email", email);
      alert("User set!");
    } else {
      alert("Could not identify user");
    }
  };

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <h1>Smart Recipe Generator</h1>
          <div className="links">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>
              Favorites
            </NavLink>
          </div>

          <div className="user">
            <input
              placeholder="Enter Email to add Favourites"
              value={email || ""}   // ✅ agar empty ho toh placeholder dikhega
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSetEmail}>Set</button>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage email={email} />} />
          <Route path="/favorites" element={<FavoritesPage email={email} />} />
        </Routes>
      </div>
    </Router>
  );
}
