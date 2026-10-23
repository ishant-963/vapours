import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../dataStore.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: "About Loreverse" }]} />

      <header className="about-hero">
        <div className="about-kicker">Architecture & Mission</div>
        <h1 className="about-title">About {siteConfig.name}</h1>
        <p className="about-desc">
          Loreverse is an editorial, multi-universe wiki and entertainment discovery platform uniting cinematic sagas, anime, manga, manhwa, novels, and interconnected lore into an elegant digital library.
        </p>
      </header>

      <div className="about-grid-two">
        <div className="about-card">
          <h3 className="about-card-title">Three-Layer Architecture</h3>
          <p className="about-card-text mb-3">
            Designed around three connected architectural layers:
          </p>
          <ul className="text-sm text-stone-600 space-y-2 list-disc pl-5">
            <li><strong>Layer A (Universe Explorer):</strong> Dedicated hubs with banners, factions, timelines, and canon continuities.</li>
            <li><strong>Layer B (Wiki Articles):</strong> Reusable templates rendering character codices, artifacts, metaphysical concepts, and locations with structured infoboxes.</li>
            <li><strong>Layer C (Entertainment Discovery):</strong> Filterable catalogs for cinema, TV series, anime, manga, manhwa, webnovels, and literature.</li>
          </ul>
        </div>

        <div className="about-card">
          <h3 className="about-card-title">Clean Modular Code</h3>
          <p className="about-card-text mb-3">
            Built with pure JavaScript (JSX) and companion CSS files for every component:
          </p>
          <ul className="text-sm text-stone-600 space-y-2 list-disc pl-5">
            <li><strong>Isolated CSS:</strong> Every component has its own dedicated <code>.css</code> stylesheet rather than cluttered inline styles.</li>
            <li><strong>Centralized Configuration:</strong> <code>siteConfig.js</code> controls platform branding, navigation, and wiki settings.</li>
            <li><strong>React Context Hooks:</strong> <code>useLibrary()</code> persists user bookmarks and watchlists in localStorage — no external libraries needed.</li>
          </ul>
        </div>
      </div>

      <div className="about-grid-two">
        <div className="about-card">
          <h3 className="about-card-title">Curated Canon Lore</h3>
          <p className="about-card-text">
            Loreverse is a self-contained, standalone lore encyclopedia. All articles, timelines, character codices, and universe chronologies are curated internally without external redirects or fragile scrapers.
          </p>
        </div>

        <div className="about-card">
          <h3 className="about-card-title">Interactive 3D Codex</h3>
          <p className="about-card-text">
            Supported character codices feature interactive 3D models (.glb) with auto-spin, full orbit controls, zoom inspection, and cinematic visual archive slides.
          </p>
        </div>
      </div>

      <div className="p-6 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-700">
        <h4 className="font-bold text-stone-900 mb-2">Notice of Attribution</h4>
        <p className="leading-relaxed">
          Characters, franchises, and media showcased (including Marvel, DC, Star Wars, Harry Potter, Solo Leveling, Attack on Titan, and One Piece) are the intellectual property of their respective creators and publishers. Loreverse serves as a non-commercial educational encyclopedia and fan discovery index.
        </p>
      </div>
    </div>
  );
}
