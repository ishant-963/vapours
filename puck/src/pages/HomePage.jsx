import React from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Film, Tv, Sparkles, BookOpen, Layers, Scroll, Library } from "../components/common/icons.jsx";
import { siteConfig, contentService, useSearch } from "../dataStore.jsx";
// Consolidated Cards suite (UniverseCard, CharacterCard, MediaCard, ArticleCard)
import { UniverseCard, CharacterCard, MediaCard, ArticleCard } from "../components/Cards.jsx";
import CyberfictionSection from "../components/CyberfictionSection.jsx";
import "./HomePage.css";

export default function HomePage() {
  const { openModal: openSearch } = useSearch();

  const featuredUniverses = contentService.getFeaturedUniverses();
  const featuredCharacters = contentService.getFeaturedCharacters();
  const featuredMedia = contentService.getFeaturedMedia();
  const featuredArticles = contentService.getFeaturedArticles();

  return (
    <div className="home-page-root">
      {/* Wiki-First Curatorial Hero */}
      <section className="home-hero-section">
        <div className="home-hero-container">
          <div className="home-hero-kicker">Multi-Universe Entertainment Archive</div>
          <h1 className="home-hero-title">
            The Encyclopedia of Fictional Universes
          </h1>
          <p className="home-hero-subtitle">
            Explore interconnected lore across cinema, anime, manga, literature, and fictional timelines. From the Marvel Multiverse to the Shadow Monarch, all stories intersect here.
          </p>

          {/* Global Search Field */}
          <div
            className="home-search-bar"
            onClick={openSearch}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openSearch();
            }}
            aria-label="Search all universes and lore"
          >
            <Search size={20} className="text-amber-700" />
            <span className="home-search-input-placeholder">
              Search by character, movie, anime, webnovel, or artifact...
            </span>
            <span className="home-search-kbd">Press ⌘K</span>
          </div>

          {/* Quick Category Badges */}
          <div className="home-quick-tags">
            <Link to="/universes" className="home-quick-tag">All Universes</Link>
            <Link to="/cyberfiction" className="home-quick-tag" style={{ borderColor: "rgba(0, 240, 255, 0.5)", color: "#00f0ff" }}>Cyberfiction 3D</Link>
            <Link to="/movies" className="home-quick-tag">Cinema</Link>
            <Link to="/anime" className="home-quick-tag">Anime</Link>
            <Link to="/manga" className="home-quick-tag">Manga & Manhwa</Link>
            <Link to="/novels" className="home-quick-tag">Webnovels</Link>
            <Link to="/characters" className="home-quick-tag">Characters & 3D</Link>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* Section 1: Featured Universes */}
        <section className="mb-14">
          <div className="home-section-header">
            <div>
              <h2 className="section-title">Featured Universes</h2>
              <p className="section-subtitle">
                Explore deeply indexed fictional continuities, timelines, and world factions.
              </p>
            </div>
            <Link to="/universes" className="home-section-link">
              Explore All Universes <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-cards">
            {featuredUniverses.slice(0, 3).map((universe) => (
              <UniverseCard key={universe.id} universe={universe} />
            ))}
          </div>
        </section>

        {/* Section 2: Popular Characters & 3D Codex */}
        <section className="mb-14">
          <div className="home-section-header">
            <div>
              <h2 className="section-title">Character Codex & 3D Models</h2>
              <p className="section-subtitle">
                Inspect character biographies, abilities, relationships, and interactive 3D models.
              </p>
            </div>
            <Link to="/characters" className="home-section-link">
              View All Characters <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-cards">
            {featuredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>

        {/* Dedicated Cyberfiction Genre Section - Distinct from Novel/Manhwa/Manga */}
        <CyberfictionSection />

        {/* Section 3: Entertainment Discovery Spotlight */}
        <section className="mb-14">
          <div className="home-section-header">
            <div>
              <h2 className="section-title">Entertainment Discovery</h2>
              <p className="section-subtitle">
                Curated cinema, television series, anime, manga, and novels with official release metadata.
              </p>
            </div>
            <Link to="/explore" className="home-section-link">
              Discovery Catalog <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-cards">
            {featuredMedia.slice(0, 4).map((media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>
        </section>

        {/* Section 4: Deep Wiki Lore Articles */}
        <section className="mb-14">
          <div className="home-section-header">
            <div>
              <h2 className="section-title">Recently Curated Wiki Lore</h2>
              <p className="section-subtitle">
                Detailed editorial articles exploring primordial artifacts, factions, and metaphysical systems.
              </p>
            </div>
            <Link to="/explore" className="home-section-link">
              Browse Wiki Articles <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-cards">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Section 5: Explore By Category Grid */}
        <section>
          <div className="home-section-header">
            <div>
              <h2 className="section-title">Explore by Media Category</h2>
              <p className="section-subtitle">
                Navigate directly to dedicated catalog hubs tailored to your favorite storytelling medium.
              </p>
            </div>
          </div>

          <div className="category-portal-grid">
            <Link to="/movies" className="category-portal-card">
              <div className="category-portal-icon-box"><Film size={22} /></div>
              <div className="category-portal-name">Cinema</div>
              <div className="category-portal-count">Blockbusters & sagas</div>
            </Link>

            <Link to="/series" className="category-portal-card">
              <div className="category-portal-icon-box"><Tv size={22} /></div>
              <div className="category-portal-name">TV Series</div>
              <div className="category-portal-count">Episodic dramas</div>
            </Link>

            <Link to="/anime" className="category-portal-card">
              <div className="category-portal-icon-box"><Sparkles size={22} /></div>
              <div className="category-portal-name">Anime</div>
              <div className="category-portal-count">Japanese animation</div>
            </Link>

            <Link to="/manga" className="category-portal-card">
              <div className="category-portal-icon-box"><BookOpen size={22} /></div>
              <div className="category-portal-name">Manga</div>
              <div className="category-portal-count">Print serialized works</div>
            </Link>

            <Link to="/manhwa" className="category-portal-card">
              <div className="category-portal-icon-box"><Layers size={22} /></div>
              <div className="category-portal-name">Manhwa</div>
              <div className="category-portal-count">Korean webtoons</div>
            </Link>

            <Link to="/novels" className="category-portal-card">
              <div className="category-portal-icon-box"><Scroll size={22} /></div>
              <div className="category-portal-name">Webnovels</div>
              <div className="category-portal-count">Original prose sagas</div>
            </Link>

            <Link to="/books" className="category-portal-card">
              <div className="category-portal-icon-box"><Library size={22} /></div>
              <div className="category-portal-name">Literature</div>
              <div className="category-portal-count">Fantasy & sci-fi books</div>
            </Link>

            <Link to="/cyberfiction" className="category-portal-card" style={{ borderColor: "rgba(0, 240, 255, 0.4)" }}>
              <div className="category-portal-icon-box" style={{ background: "rgba(0, 240, 255, 0.15)", color: "#00f0ff" }}><Sparkles size={22} /></div>
              <div className="category-portal-name" style={{ color: "#00f0ff" }}>Cyberfiction</div>
              <div className="category-portal-count">3D canvas & metaverse lore</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
