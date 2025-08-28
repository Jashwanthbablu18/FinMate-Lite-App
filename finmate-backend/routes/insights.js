import express from "express";
import { generateInsights } from "../openai.js";

const router = express.Router();

// POST /api/insights
router.post("/", async (req, res) => {
  try {
    const { salary, expenses, investments } = req.body;

    if (!salary || !expenses || !investments) {
      return res.status(400).json({ error: "Missing salary, expenses, or investments" });
    }

    const insights = await generateInsights({ salary, expenses, investments });
    res.json({ insights });
  } catch (error) {
    console.error("Insights API error:", error);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

export default router;
