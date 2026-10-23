import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { contentService } from "../dataStore.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import { CharacterCard, MediaCard, ArticleCard } from "../components/Cards.jsx";
import TimelineView from "../components/wiki/TimelineView.jsx";

import EmptyState from "../components/common/EmptyState.jsx";
import "./UniversePage.css";

export default function UniversePage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const universe = contentService.getUniverseFullDetails(slug);

  if (!universe) {
    return (
      <div className="page-container">
        <EmptyState
          title="Universe not found"
          description="The fictional universe you requested does not exist in our archive."
          actionText="Return to Universes"
          actionLink="/universes"
        />
      </div>
    );
  }

  return (
    <div className="universe-page-root">
      {/* Cinematic Banner */}
      <div className="universe-hero">
        <img
          src={universe.bannerImage}
          alt={universe.name}
          className="universe-hero-img"
          referrerPolicy="no-referrer"
        />
        <div className="universe-hero-overlay">
          <div className="universe-hero-content">
            <div className="universe-hero-tag">{universe.category}</div>
            <h1 className="universe-hero-title">{universe.name}</h1>
            {universe.tagline && (
              <p className="universe-hero-tagline">"{universe.tagline}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="universe-tabs-bar">
        <div className="universe-tabs-inner">
          <button
            type="button"
            className={`universe-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview & Lore
          </button>
          <button
            type="button"
            className={`universe-tab-btn ${activeTab === "characters" ? "active" : ""}`}
            onClick={() => setActiveTab("characters")}
          >
            Characters ({universe.characters.length})
          </button>
          <button
            type="button"
            className={`universe-tab-btn ${activeTab === "works" ? "active" : ""}`}
            onClick={() => setActiveTab("works")}
          >
            Cinema, Series & Books ({universe.media.length})
          </button>
          <button
            type="button"
            className={`universe-tab-btn ${activeTab === "timeline" ? "active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            Chronology & Timeline
          </button>
          <button
            type="button"
            className={`universe-tab-btn ${activeTab === "articles" ? "active" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            Wiki Articles ({universe.articles.length})
          </button>
        </div>
      </div>

      <div className="page-container">
        <Breadcrumbs
          items={[
            { label: "Universes", path: "/universes" },
            { label: universe.name }
          ]}
        />

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div>
            <div className="mb-10 max-w-3xl">
              <h2 className="section-title mb-3">Continuity Overview</h2>
              <p className="text-stone-700 leading-relaxed text-base mb-6">
                {universe.description}
              </p>

              <div className="metadata-line py-3 border-y border-stone-200">
                <span>Creator: <strong>{universe.creator}</strong></span>
                <span className="metadata-separator">·</span>
                <span>Debut: <strong>{universe.debutYear}</strong></span>
                <span className="metadata-separator">·</span>
                <span>Continuity: <strong>Prime Canon</strong></span>
              </div>
            </div>



            {/* Factions & Organizations */}
            {universe.factions && universe.factions.length > 0 && (
              <div className="mb-12">
                <h3 className="section-title mb-2">Major Factions & Orders</h3>
                <p className="section-subtitle mb-4">
                  The influential alliances, military divisions, and esoteric orders shaping this universe.
                </p>
                <div className="factions-grid">
                  {universe.factions.map((f, i) => (
                    <div key={i} className="faction-card">
                      <h4 className="faction-title">{f.name}</h4>
                      <p className="faction-desc">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Preview of Characters */}
            {universe.characters.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="section-title">Key Figures</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("characters")}
                    className="text-amber-700 font-semibold text-sm hover:underline"
                  >
                    View All {universe.characters.length} →
                  </button>
                </div>
                <div className="grid-cards">
                  {universe.characters.slice(0, 3).map((c) => (
                    <CharacterCard key={c.id} character={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Characters */}
        {activeTab === "characters" && (
          <div>
            <div className="mb-6">
              <h2 className="section-title">Characters of {universe.name}</h2>
              <p className="section-subtitle">
                Explore protagonist codices, anti-heroes, and cosmic deities within this realm.
              </p>
            </div>
            {universe.characters.length === 0 ? (
              <EmptyState title="No characters registered" description="No character profiles currently linked to this universe." />
            ) : (
              <div className="grid-cards">
                {universe.characters.map((c) => (
                  <CharacterCard key={c.id} character={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Works & Media */}
        {activeTab === "works" && (
          <div>
            <div className="mb-6">
              <h2 className="section-title">Catalog of Works & Adaptations</h2>
              <p className="section-subtitle">
                Movies, television seasons, books, manga, and related media releases.
              </p>
            </div>
            {universe.media.length === 0 ? (
              <EmptyState title="No media indexed" description="No titles currently indexed under this universe." />
            ) : (
              <div className="grid-cards">
                {universe.media.map((m) => (
                  <MediaCard key={m.id} media={m} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Chronology Timeline */}
        {activeTab === "timeline" && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="section-title">Canon Chronology</h2>
              <p className="section-subtitle">
                Significant historical markers, cataclysms, and turning points in sequence.
              </p>
            </div>
            {universe.timeline && universe.timeline.length > 0 ? (
              <TimelineView events={universe.timeline} />
            ) : (
              <EmptyState title="Timeline not yet archived" description="Chronological records for this universe are in preparation." />
            )}
          </div>
        )}

        {/* Tab 5: Wiki Articles */}
        {activeTab === "articles" && (
          <div>
            <div className="mb-6">
              <h2 className="section-title">Deep Lore Wiki Articles</h2>
              <p className="section-subtitle">
                Comprehensive reference documents detailing artifacts, biology, and cosmology.
              </p>
            </div>
            {universe.articles.length === 0 ? (
              <EmptyState title="No wiki articles found" description="No encyclopedic entries currently cataloged." />
            ) : (
              <div className="grid-cards">
                {universe.articles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
