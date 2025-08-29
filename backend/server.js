// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const recipesRouter = require("./routes/recipes");
const usersRouter = require("./routes/users");
const ingredientsRouter = require("./routes/ingredients");

const app = express();

// Parse JSON
app.use(express.json());

// CORS: read allowed origins from env (comma-separated)
// Example: CORS_ORIGIN=https://your-frontend.vercel.app,http://localhost:5173
const rawOrigins = process.env.CORS_ORIGIN || "";
const allowedOrigins = rawOrigins
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// CORS middleware with credentials support
app.use(
  cors({
    origin: function (origin, callback) {
      // If no origin (e.g. server-to-server request or curl), allow it.
      if (!origin) return callback(null, true);
      // If no env set, allow all (useful for local dev) — change in production if required
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: origin not allowed"), false);
    },
    credentials: true,
  })
);

// serve uploaded images (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Mongo
const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) {
  console.warn("⚠️  Warning: MONGO_URI is not set. Set it in your .env or hosting env vars.");
}
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });

// Mount routers
app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);
app.use("/api/ingredients", ingredientsRouter);

// Root (optional)
app.get("/", (req, res) => {
  res.send("Smart Recipe Generator Backend Running 🚀");
});

// Health route (important for Render / monitoring)
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
