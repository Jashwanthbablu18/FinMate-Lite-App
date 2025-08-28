// finmate-backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Helpers to handle ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// =========================
// 🔹 Example API route
// =========================
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Backend running", openaiKeyLoaded: !!process.env.OPENAI_API_KEY });
});

// TODO: Add your other API routes here
// Example: app.use("/api/expenses", expensesRouter);

// =========================
// 🔹 Serve Frontend (React)
// =========================
const frontendPath = path.join(__dirname, "../finmate-frontend/dist");

// Serve static frontend files
app.use(express.static(frontendPath));

// Catch-all route → React handles frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// =========================
// 🔹 Start server
// =========================
app.listen(PORT, () => {
  console.log(`🚀 FinMate backend running on port ${PORT}`);
  console.log(`🔐 OPENAI_API_KEY loaded? ${!!process.env.OPENAI_API_KEY}`);
});
