import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../dataStore.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>{siteConfig.name}</span>
              <span className="footer-logo-dot">.</span>
            </Link>
            <p className="footer-description">
              An editorial discovery archive and interconnected lore database uniting fictional universes, characters, literature, and screen adaptations.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Universes</h4>
            <ul className="footer-nav-list">
              <li><Link to="/universes/marvel-cinematic-universe" className="footer-nav-link">Marvel Cinematic Universe</Link></li>
              <li><Link to="/universes/star-wars" className="footer-nav-link">Star Wars Galaxy</Link></li>
              <li><Link to="/universes/solo-leveling" className="footer-nav-link">Solo Leveling</Link></li>
              <li><Link to="/universes/attack-on-titan" className="footer-nav-link">Attack on Titan</Link></li>
              <li><Link to="/universes/wizarding-world" className="footer-nav-link">Wizarding World</Link></li>
              <li><Link to="/universes" className="footer-nav-link">All Universes →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Discovery</h4>
            <ul className="footer-nav-list">
              <li><Link to="/movies" className="footer-nav-link">Feature Films</Link></li>
              <li><Link to="/series" className="footer-nav-link">Television Series</Link></li>
              <li><Link to="/anime" className="footer-nav-link">Anime Series</Link></li>
              <li><Link to="/manga" className="footer-nav-link">Manga & Manhwa</Link></li>
              <li><Link to="/novels" className="footer-nav-link">Webnovels & Books</Link></li>
              <li><Link to="/characters" className="footer-nav-link">Character Codex</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-nav-list">
              <li><Link to="/about" className="footer-nav-link">About & Architecture</Link></li>
              <li><Link to="/library" className="footer-nav-link">Personal Library</Link></li>
              <li><Link to="/universes" className="footer-nav-link">Curated Universes</Link></li>
              <li><Link to="/explore" className="footer-nav-link">Media Archive</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Designed with curatorial white & gold precision.</p>
          <div className="footer-bottom-links">
            <Link to="/about" className="footer-nav-link">Documentation & Attributions</Link>
            <Link to="/library" className="footer-nav-link">Saved Items</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
