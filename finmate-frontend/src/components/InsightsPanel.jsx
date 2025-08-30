// src/components/InsightsPanel.jsx
import React, { useState } from "react";
import axios from "axios";
import "./InsightsPanel.css";

// Default API base: production uses relative `/api`
const API_BASE = import.meta.env.VITE_API_URL || "/api";

const InsightsPanel = ({ salary, expenses, savings, investments }) => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateInsights = async () => {
    setLoading(true);
    setError("");
    setInsights("");

    try {
      const spendingBreakdown = (expenses || []).reduce((acc, expense) => {
        const key = expense?.category || "Other";
        const amt = Number(expense?.amount) || 0;
        acc[key] = (acc[key] || 0) + amt;
        return acc;
      }, {});

      const payload = { salary, expenses, spendingBreakdown, savings, investments };

      const response = await axios.post(`${API_BASE}/insights`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });

      setInsights(response.data?.insight || "No insights generated.");
    } catch (err) {
      console.error("Insights error:", err);
      if (err?.response?.data?.message) setError(err.response.data.message);
      else if (err?.response?.data?.error) setError(err.response.data.error);
      else setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insights-panel">
      <div className="panel-header">
        <h3>🧠 AI Insights</h3>
        <button onClick={generateInsights} className="generate-btn" disabled={loading}>
          {loading ? "Generating..." : "Generate Insights"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {insights ? (
        <div className="insights-content">
          <div className="insight-text">
            {insights.split("\n").filter(Boolean).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      ) : !loading ? (
        <div className="placeholder">
          <div className="placeholder-icon">💡</div>
          <p>Generate personalized financial insights based on your spending patterns</p>
        </div>
      ) : null}
    </div>
  );
};

export default InsightsPanel;
