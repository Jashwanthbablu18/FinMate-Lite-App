import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI setup
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY in environment.");
  process.exit(1);
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// API route
app.post("/api/insights", async (req, res) => {
  try {
    const { salary, expenses, savings, investments, spendingBreakdown } = req.body;

    const prompt = `
You are a financial assistant. Based on the user's data:
- Salary: ₹${salary}
- Savings: ₹${savings}
- Investments: ₹${investments}
- Spending breakdown: ${JSON.stringify(spendingBreakdown)}

Provide 3-5 personalized financial insights and suggestions. Keep them short, clear, and actionable.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful financial assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
    });

    const insight = completion.choices[0]?.message?.content?.trim();
    res.json({ insight });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../finmate-frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FinMate backend running on port ${PORT}`);
  console.log(`🔐 OPENAI_API_KEY loaded? ${!!process.env.OPENAI_API_KEY}`);
});
