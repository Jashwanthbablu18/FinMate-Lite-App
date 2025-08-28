// src/components/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ salary, expenses, savings, investments }) => {
  const toNumber = (v) => Number(v) || 0;
  const spendingBudget = toNumber(salary) * 0.5;
  const savingsBudget = toNumber(salary) * 0.2;
  const investmentBudget = toNumber(salary) * 0.3;

  const totalSpent = (expenses || []).reduce((sum, expense) => sum + toNumber(expense.amount), 0);

  const pct = (num, den) => (den > 0 ? Math.min((num / den) * 100, 100) : 0);

  const spendingPercentage = pct(totalSpent, spendingBudget);
  const savingsPercentage = pct(savings, savingsBudget);
  const investmentPercentage = pct(investments, investmentBudget);

  const categoryBreakdown = (expenses || []).reduce((acc, expense) => {
    const cat = expense?.category || 'Other';
    acc[cat] = (acc[cat] || 0) + toNumber(expense.amount);
    return acc;
  }, {});

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FFD8A9',
      Transport: '#A3D8FF',
      Entertainment: '#B5EAD7',
      Shopping: '#FFA9A9',
      Bills: '#D8A9FF',
      Rent: '#A9FFD8',
      Healthcare: '#FFA9D8',
      Travel: '#D8FFA9',
      Other: '#CBD5E0'
    };
    return colors[category] || '#CBD5E0';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Financial Dashboard</h2>
        <p>50/30/20 Budget Allocation</p>
      </div>

      <div className="metrics-grid">
        {/* Spending Metric */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>💸 Spending</h3>
            <span className="metric-budget">50%</span>
          </div>
          <div className="metric-amount">₹{totalSpent.toLocaleString()}</div>
          <div className="metric-subtitle">of ₹{spendingBudget.toLocaleString()}</div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill spending-fill"
                style={{ width: `${Math.round(spendingPercentage)}%` }}
              ></div>
            </div>
            <span className="progress-percentage">{Math.round(spendingPercentage)}%</span>
          </div>
        </div>

        {/* Savings Metric */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>🏦 Savings</h3>
            <span className="metric-budget">20%</span>
          </div>
          <div className="metric-amount">₹{toNumber(savings).toLocaleString()}</div>
          <div className="metric-subtitle">of ₹{savingsBudget.toLocaleString()}</div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill savings-fill"
                style={{ width: `${Math.round(savingsPercentage)}%` }}
              ></div>
            </div>
            <span className="progress-percentage">{Math.round(savingsPercentage)}%</span>
          </div>
        </div>

        {/* Investments Metric */}
        <div className="metric-card">
          <div className="metric-header">
            <h3>📈 Investments</h3>
            <span className="metric-budget">30%</span>
          </div>
          <div className="metric-amount">₹{toNumber(investments).toLocaleString()}</div>
          <div className="metric-subtitle">of ₹{investmentBudget.toLocaleString()}</div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill investment-fill"
                style={{ width: `${Math.round(investmentPercentage)}%` }}
              ></div>
            </div>
            <span className="progress-percentage">{Math.round(investmentPercentage)}%</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-section">
        <h3>Spending by Category</h3>
        <div className="category-grid">
          {Object.entries(categoryBreakdown).length === 0 && (
            <div className="category-item">
              <div className="category-info">
                <span className="category-name">No expenses yet</span>
              </div>
            </div>
          )}
          {Object.entries(categoryBreakdown).map(([category, amount]) => {
            const percent = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
            return (
              <div key={category} className="category-item">
                <div className="category-color" style={{ backgroundColor: getCategoryColor(category) }}></div>
                <div className="category-info">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">₹{amount.toLocaleString()}</span>
                </div>
                <div className="category-percentage">
                  {percent}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="recent-expenses">
        <h3>Recent Expenses</h3>
        <div className="expenses-list">
          {(expenses || []).slice(-5).reverse().map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-main">
                <span className="expense-desc">{expense.description}</span>
                <span className="expense-amount">₹{Number(expense.amount || 0).toLocaleString()}</span>
              </div>
              <div className="expense-meta">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">
                  {expense.date ? new Date(expense.date).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
