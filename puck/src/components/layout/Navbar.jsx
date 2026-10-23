import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Bookmark, Menu, X } from "../common/icons.jsx";
import { siteConfig, useLibrary, useSearch } from "../../dataStore.jsx";
import "./Navbar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items: libraryItems } = useLibrary();
  const { openModal: openSearchModal } = useSearch();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Zone 1: Single text element wordmark */}
        <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="navbar-brand-symbol">L</span>
          <span className="navbar-brand-name">
            {siteConfig.name}
            <span className="navbar-brand-dot">.</span>
          </span>
        </Link>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink
            to="/explore"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            Explore
          </NavLink>
          <NavLink
            to="/universes"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            Universes
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            Cinema & Series
          </NavLink>
          <NavLink
            to="/anime"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            Anime & Manga
          </NavLink>
          <NavLink
            to="/characters"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            Characters
          </NavLink>
          <NavLink
            to="/cyberfiction"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
            style={({ isActive }) => ({ color: isActive ? "#00f0ff" : "#38bdf8" })}
          >
            Cyberfiction
          </NavLink>
        </nav>

        {/* Zone 3: Primary Actions (Search + Library) */}
        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-search-btn"
            onClick={openSearchModal}
            aria-label="Open search dialog"
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search lore, works...</span>
            <span className="navbar-search-kbd">⌘K</span>
          </button>

          <Link to="/library" className="navbar-library-btn" aria-label="Personal Library">
            <Bookmark size={15} />
            <span>Library</span>
            {libraryItems.length > 0 && (
              <span className="navbar-library-count">{libraryItems.length}</span>
            )}
          </Link>

          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <nav className="navbar-mobile-links">
          {siteConfig.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `navbar-mobile-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/about"
            className={({ isActive }) => `navbar-mobile-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Loreverse
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
