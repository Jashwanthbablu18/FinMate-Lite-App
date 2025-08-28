import React from 'react';
import './Footer.css'; // Import the CSS file

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        Made with <span className="heart"> ❤️ </span> by <strong>Jashwanth N</strong> — FinMate - Lite · © {year}
      </div>
    </footer>
  );
}
