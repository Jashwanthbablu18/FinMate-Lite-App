// server.js
import dotenv from "dotenv";
dotenv.config(); // MUST run before importing/initializing any modules that depend on env

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "1mb" }));

// CORS: allow Vite dev server and optional production origin
const allowList = [
  "http://localhost:5173",        // Vite dev server
  process.env.CORS_ORIGIN         // production frontend origin (optional)
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowList.includes(origin)) return callback(null, true);
    return callback(new Error("CORS policy: Origin not allowed"), false);
  },
  credentials: true
}));

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Load routes AFTER dotenv.config() so they can safely read process.env
const start = async () => {
  try {
    const module = await import("./routes/openai.js");
    // openai.js exports a factory function that returns an Express router
    const createOpenAIRouter = module.default;
    const openaiRouter = createOpenAIRouter();
    app.use("/api", openaiRouter);

    const PORT = Number(process.env.PORT) || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 FinMate backend running on port ${PORT}`);
      console.log("🔐 OPENAI_API_KEY loaded?", !!process.env.OPENAI_API_KEY);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
