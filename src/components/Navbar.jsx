import React, { useState } from 'react';
import './Navbar.css';

const NAV_ITEMS = ['Dashboard', 'GIS Map', 'Images', 'Analysis', 'Reports'];

function LeafMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="14" fill="#E5F2EC" />
      <path
        d="M9 18C9 12 12 9 19 9C19 16 16 19 10 19C9.4 19 9 18.6 9 18Z"
        fill="#1E7A5C"
      />
      <path
        d="M9.5 18.5L17 11"
        stroke="#E5F2EC"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar({ activePage = 'Dashboard', onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (item) => {
    onNavigate?.(item);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => handleNavigate('Dashboard')}>
          <LeafMark />
          <span className="navbar-brand-name">GEOVISION</span>
        </button>

        <nav className="navbar-links navbar-links-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`navbar-link ${item === activePage ? 'navbar-link-active' : ''}`}
              onClick={() => handleNavigate(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="navbar-right">
          <button
            className="navbar-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="#16211C" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <button className="navbar-profile" aria-label="User profile">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.2" stroke="#5C6B63" strokeWidth="1.4" />
              <path
                d="M3.5 17C4.5 13.5 7 11.8 10 11.8C13 11.8 15.5 13.5 16.5 17"
                stroke="#5C6B63"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="navbar-links navbar-links-mobile" aria-label="Primary mobile">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`navbar-link ${item === activePage ? 'navbar-link-active' : ''}`}
              onClick={() => handleNavigate(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
