// src/App.jsx
import React, { useState } from "react";
import SalaryForm from "./components/SalaryForm";
import ExpenseForm from "./components/ExpenseForm";
import Dashboard from "./components/Dashboard";
import InsightsPanel from "./components/InsightsPanel";
import Footer from "./components/Footer";
import logo from "./assets/FinMate-LiteLogo.png";
import "./App.css";

function App() {
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState(0);
  const [investments, setInvestments] = useState(0);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      amount: Number(expense.amount) || 0,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const addSavings = (amount) => {
    setSavings((prev) => prev + (Number(amount) || 0));
  };

  const addInvestment = (amount) => {
    setInvestments((prev) => prev + (Number(amount) || 0));
  };

  if (salary === 0) {
    return <SalaryForm onSalarySet={setSalary} />;
  }

  return (
    <div className="app flex flex-col min-h-screen">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-title">
            <img
              src={logo}
              alt="FinMate Logo"
              className="app-logo"
            />
            {/* <h1>FinMate - Lite</h1> */}
          </div>
          {/* <p>Modern Personal Finance</p> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main flex-grow">
        <div className="layout-grid">
          {/* Left Sidebar - Input Forms */}
          <aside className="sidebar">
            <div className="salary-card">
              <h3>Monthly Salary</h3>
              <div className="salary-amount">₹{salary.toLocaleString()}</div>
              <button onClick={() => setSalary(0)} className="change-btn">
                Change
              </button>
            </div>

            <ExpenseForm onAddExpense={addExpense} />

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <button
                onClick={() => addSavings(salary * 0.2)}
                className="action-btn save"
              >
                Add Monthly Savings
              </button>
              <button
                onClick={() => addInvestment(salary * 0.3)}
                className="action-btn invest"
              >
                Add Monthly Investments
              </button>
            </div>
          </aside>

          {/* Main Dashboard */}
          <section className="main-content">
            <Dashboard
              salary={salary}
              expenses={expenses}
              savings={savings}
              investments={investments}
            />
          </section>

          {/* Right Sidebar - Insights */}
          <aside className="insights-sidebar">
            <InsightsPanel
              salary={salary}
              expenses={expenses}
              savings={savings}
              investments={investments}
            />
          </aside>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
