import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, ShieldCheck, AlertCircle, Box, ChevronDown, ChevronUp } from "../components/common/icons.jsx";
import { contentService, useLibrary } from "../dataStore.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import ArticleInfobox from "../components/wiki/ArticleInfobox.jsx";

import EmptyState from "../components/common/EmptyState.jsx";
import CharacterHeroShowcase from "../components/wiki/CharacterHeroShowcase.jsx";
import "./CharacterPage.css";

export default function CharacterPage() {
  const { slug } = useParams();
  const character = contentService.getCharacterBySlug(slug);

  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (key) => {
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { isInLibrary, addItem, removeItem } = useLibrary();

  if (!character) {
    return (
      <div className="page-container">
        <EmptyState
          title="Character Codex Not Found"
          description="The requested character entry could not be located in our archives."
          actionText="Return to Character List"
          actionLink="/characters"
        />
      </div>
    );
  }

  const saved = isInLibrary(character.id);

  const handleLibraryToggle = () => {
    if (saved) {
      removeItem(character.id);
    } else {
      addItem({
        id: character.id,
        slug: character.slug,
        title: character.name,
        type: "character",
        category: "Character",
        portrait: character.portrait,
        universeName: character.universeName
      }, "bookmarked");
    }
  };

  const infoboxFields = [
    { label: "Real Name", value: character.realName },
    { label: "Aliases", value: character.aliases?.join(", ") },
    { label: "Species", value: character.species },
    { label: "Universe", value: character.universeName },
    { label: "Affiliations", value: character.affiliations?.join(", ") },
    { label: "First Appearance", value: character.firstAppearance },
    { label: "Occupation", value: character.occupation },
    { label: "Attribution", value: character.sourceAttribution }
  ].filter(f => Boolean(f.value));

  return (
    <div className="page-container">
      <Breadcrumbs
        items={[
          { label: "Characters", path: "/characters" },
          { label: character.name }
        ]}
      />

      {/* Cinematic Character Header with Universe Background */}
      <div
        className="character-header"
        style={
          character.backgroundImage
            ? {
                backgroundImage: `linear-gradient(to right, rgba(14, 15, 18, 0.95) 25%, rgba(14, 15, 18, 0.75) 65%, rgba(14, 15, 18, 0.45) 100%), url(${character.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "2.5rem 2rem",
                borderRadius: "var(--radius-lg, 12px)",
                border: "1px solid rgba(229, 213, 179, 0.2)",
              }
            : {}
        }
      >
        <div className="character-universe-crumb">
          <Link to={`/universes/${character.universeId}`} className="hover:underline">
            {character.universeName}
          </Link>
        </div>
        <h1 className="character-name-title">{character.name}</h1>
        {character.aliases && (
          <div className="character-aliases-row">
            Known as: {character.aliases.join(" · ")}
          </div>
        )}

        <div className="character-action-bar">
          <button
            type="button"
            onClick={handleLibraryToggle}
            className={`character-save-btn ${saved ? "saved" : "unsaved"}`}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
            <span>{saved ? "Saved in Library" : "Bookmark to Library"}</span>
          </button>

          {character.localModel && (
            <div className="character-3d-badge-indicator">
              <Box size={14} className="text-amber-400" />
              <span>3D Model Available</span>
            </div>
          )}
        </div>
      </div>

      <div className="character-page-layout">
        {/* Left Column: 3D Showcase, Biography, Abilities & Stats */}
        <main>
          {/* Interactive 3D Model & Thematic Picture Showcase */}
          <CharacterHeroShowcase character={character} />

          {/* Combat Statistics / Attribute Matrix */}
          {character.stats && (
            <section className="character-section">
              <h2
                className="character-section-title toggleable"
                onClick={() => toggleSection("stats")}
              >
                <span>Combat & Power Matrix</span>
                <span className="character-section-toggle-badge">
                  {collapsedSections["stats"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{collapsedSections["stats"] ? "Expand" : "Collapse"}</span>
                </span>
              </h2>
              {!collapsedSections["stats"] && (
                <div className="character-stats-grid">
                  {Object.entries(character.stats).map(([statName, val]) => (
                    <div key={statName} className="character-stat-card">
                      <div className="character-stat-label">{statName.toUpperCase()}</div>
                      <div className="character-stat-bar-track">
                        <div
                          className="character-stat-bar-fill"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                      <div className="character-stat-val">{val} / 100</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Biography */}
          <section className="character-section">
            <h2
              className="character-section-title toggleable"
              onClick={() => toggleSection("biography")}
            >
              <span>Biography & Background</span>
              <span className="character-section-toggle-badge">
                {collapsedSections["biography"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                <span>{collapsedSections["biography"] ? "Expand" : "Collapse"}</span>
              </span>
            </h2>
            {!collapsedSections["biography"] && (
              <p className="character-prose">{character.biography}</p>
            )}
          </section>

          {/* Signature Weapons & Equipment */}
          {character.weapons && character.weapons.length > 0 && (
            <section className="character-section">
              <h2
                className="character-section-title toggleable"
                onClick={() => toggleSection("weapons")}
              >
                <span>Signature Weapons & Relics</span>
                <span className="character-section-toggle-badge">
                  {collapsedSections["weapons"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{collapsedSections["weapons"] ? "Expand" : "Collapse"}</span>
                </span>
              </h2>
              {!collapsedSections["weapons"] && (
                <div className="character-weapons-grid">
                  {character.weapons.map((w, idx) => (
                    <div key={idx} className="character-weapon-card">
                      <div className="character-weapon-header">
                        <h4 className="character-weapon-name">{w.name}</h4>
                        <span className="character-weapon-type">{w.type}</span>
                      </div>
                      <p className="character-weapon-desc">{w.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Abilities & Powers */}
          {character.abilities && character.abilities.length > 0 && (
            <section className="character-section">
              <h2
                className="character-section-title toggleable"
                onClick={() => toggleSection("abilities")}
              >
                <span>Powers, Skills & Enhancements</span>
                <span className="character-section-toggle-badge">
                  {collapsedSections["abilities"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{collapsedSections["abilities"] ? "Expand" : "Collapse"}</span>
                </span>
              </h2>
              {!collapsedSections["abilities"] && (
                <ul className="character-ability-list">
                  {character.abilities.map((ability, idx) => (
                    <li key={idx} className="character-ability-item">
                      <ShieldCheck size={16} className="text-amber-700 shrink-0" />
                      <span>{ability}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Known Vulnerabilities & Weaknesses */}
          {character.weaknesses && character.weaknesses.length > 0 && (
            <section className="character-section">
              <h2
                className="character-section-title toggleable"
                onClick={() => toggleSection("weaknesses")}
              >
                <span>Known Vulnerabilities</span>
                <span className="character-section-toggle-badge">
                  {collapsedSections["weaknesses"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{collapsedSections["weaknesses"] ? "Expand" : "Collapse"}</span>
                </span>
              </h2>
              {!collapsedSections["weaknesses"] && (
                <ul className="character-ability-list">
                  {character.weaknesses.map((w, idx) => (
                    <li key={idx} className="character-ability-item">
                      <AlertCircle size={16} className="text-stone-500 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Significant Relationships */}
          {character.relationships && character.relationships.length > 0 && (
            <section className="character-section">
              <h2
                className="character-section-title toggleable"
                onClick={() => toggleSection("relationships")}
              >
                <span>Key Relationships & Alliances</span>
                <span className="character-section-toggle-badge">
                  {collapsedSections["relationships"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{collapsedSections["relationships"] ? "Expand" : "Collapse"}</span>
                </span>
              </h2>
              {!collapsedSections["relationships"] && (
                <div className="character-rel-grid">
                  {character.relationships.map((rel, idx) => (
                    <div key={idx} className="character-rel-card">
                      <div className="character-rel-name">{rel.name}</div>
                      <div className="character-rel-role">{rel.relation}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Appearances in Canon Works */}
          {character.appearances && character.appearances.length > 0 && (
            <section className="character-section">
              <h2
                className="character-section-title toggleable"
                onClick={() => toggleSection("appearances")}
              >
                <span>Chronological Appearances</span>
                <span className="character-section-toggle-badge">
                  {collapsedSections["appearances"] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  <span>{collapsedSections["appearances"] ? "Expand" : "Collapse"}</span>
                </span>
              </h2>
              {!collapsedSections["appearances"] && (
                <div className="character-appearances-list">
                  {character.appearances.map((app, idx) => (
                    <div key={idx} className="character-appearance-item">
                      <div>
                        <span className="font-semibold text-stone-900">{app.title}</span>
                        <span className="text-xs text-stone-500 ml-2">({app.year})</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        {app.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}


        </main>

        {/* Right Column: Standardized Infobox */}
        <aside>
          <ArticleInfobox
            title={character.name}
            subtitle={character.species}
            image={character.portrait}
            imageCaption={`${character.name} Canonical Portrait`}
            fields={infoboxFields}
          />
        </aside>
      </div>
    </div>
  );
}
