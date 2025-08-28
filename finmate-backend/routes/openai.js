// routes/openai.js
import express from "express";
import OpenAI from "openai";

export default function createOpenAIRouter() {
  const router = express.Router();

  // Create client AFTER dotenv has been executed in server.js
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ OPENAI_API_KEY is not set. Routes will return an explanatory error.");
  }

  // Lazy client creation - create here so it happens after dotenv.run in server
  let client;
  if (apiKey) {
    client = new OpenAI({ apiKey });
  }

  const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

  router.post("/insights", async (req, res) => {
    try {
      if (!client) {
        return res.status(500).json({
          error: "OpenAI API key not configured on server. Contact admin."
        });
      }

      const {
        salary = 0,
        expenses = [],
        spendingBreakdown = {},
        savings = 0,
        investments = 0
      } = req.body || {};

      const monthlySalary = Number(salary) || 0;
      const safeExpenses = Array.isArray(expenses) ? expenses : [];
      const totalExpenses = safeExpenses.reduce((s, e) => s + (Number(e?.amount) || 0), 0);
      const safeSavings = Number(savings) || 0;
      const safeInvestments = Number(investments) || 0;

      const systemMessage = `You are a concise, practical personal finance advisor for users in India (INR). Use the 50/30/20 rule as a guide but adapt recommendations to the provided numbers. Keep output to 3-4 short bullet points, actionable and specific. Avoid filler.`;
      const userMessage = [
        `Monthly salary: ₹${monthlySalary.toLocaleString("en-IN")}`,
        `Total expenses: ₹${totalExpenses.toLocaleString("en-IN")}`,
        `Savings so far: ₹${safeSavings.toLocaleString("en-IN")}`,
        `Investments so far: ₹${safeInvestments.toLocaleString("en-IN")}`,
        `Spending breakdown (by category): ${JSON.stringify(spendingBreakdown)}`
      ].join("\n");

      const completion = await client.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage }
        ],
        temperature: 0.35,
        max_tokens: 300
      });

      const insight = completion?.choices?.[0]?.message?.content?.trim() || "";
      if (!insight) return res.status(502).json({ error: "No response from AI model" });

      return res.json({ insight });
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({
        error: "Failed to generate insights",
        message: process.env.NODE_ENV === "development" ? String(error.message || error) : "Internal server error"
      });
    }
  });

  return router;
}
