import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food'
  });

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Shopping', 
    'Bills', 'Rent', 'Healthcare', 'Travel', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      onAddExpense({
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category
      });
      setFormData({ description: '', amount: '', category: 'Food' });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="expense-form-card">
      <h3>Add Expense</h3>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you spend on?"
              className="text-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="number-input"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select-input"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-expense-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;