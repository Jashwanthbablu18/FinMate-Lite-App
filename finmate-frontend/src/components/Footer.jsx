import React from 'react';
import './Footer.css'; // Import the CSS file

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        Made with <span className="heart"> ❤️ </span> by <a href='https://jashwanths-portfolio.onrender.com/'><strong>Jashwanth N</strong></a> — FinMate - Lite · © {year}
      </div>
    </footer>
  );
}
