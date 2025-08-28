import React, { useState } from 'react';
import './SalaryForm.css';
import Footer from './Footer';

const SalaryForm = ({ onSalarySet }) => {
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (salary && !isNaN(salary)) {
      onSalarySet(Number(salary));
    }
  };

  return (
    <div className="salary-form-wrapper">
      <div className="salary-form-inner">
        <div className="salary-form-card">
          <div className="form-header">
            <h1>Welcome to FinMate</h1>
            <p>Start by entering your monthly salary</p>
          </div>

          <form onSubmit={handleSubmit} className="salary-form">
            <div className="input-group">
              <label htmlFor="salary">Monthly Salary (₹)</label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter your monthly salary"
                className="salary-input"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Continue to Dashboard
            </button>
          </form>

          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">💸</div>
              <h4>50% Spending</h4>
              <p>For daily expenses and needs</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🏦</div>
              <h4>20% Savings</h4>
              <p>For future goals and emergency fund</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📈</div>
              <h4>30% Investing</h4>
              <p>For long-term wealth building</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-desktop">
        <Footer />
      </div>
    </div>
  );
};

export default SalaryForm;
