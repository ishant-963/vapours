import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bookmark, Box } from "./common/icons.jsx";
import { useLibrary } from "../dataStore.jsx";

// Import CSS styles for cards
import "./cards/UniverseCard.css";
import "./cards/CharacterCard.css";
import "./cards/MediaCard.css";
import "./cards/ArticleCard.css";

/**
 * ============================================================================
 * LOREVERSE UNIFIED CARDS COMPONENT SUITE
 * ============================================================================
 * 
 * --- DATA FLOW EXPLANATION FOR BEGINNERS ---
 * 
 * 1. DATA ORIGIN (Where data is born):
 *    - Located in: `src/dataStore.jsx`
 *    - All raw records live in arrays: `universesData`, `charactersData`, 
 *      `mediaData`, and `articlesData`.
 * 
 * 2. DATA QUERY / RETRIEVAL (How pages get data):
 *    - Pages (e.g. `HomePage`, `CharacterListPage`) call helper methods from
 *      `contentService` (e.g. `contentService.getAllCharacters()`).
 * 
 * 3. COMPONENT PROP PASSING (Parent -> Child):
 *    - The parent page maps over the list and passes individual items into 
 *      these card components:
 *        <CharacterCard key={c.id} character={c} />
 *        <MediaCard key={m.id} media={m} />
 *        <UniverseCard key={u.id} universe={u} />
 *        <ArticleCard key={a.id} article={a} />
 * 
 * 4. GLOBAL STATE & BOOKMARKING (Child -> Store -> LocalStorage):
 *    - React Context hook: `useLibrary()` returns { items, isInLibrary, addItem, removeItem, ... }
 *    - When the user clicks the Bookmark icon, `handleLibraryToggle()` triggers
 *      `addItem()` or `removeItem()`, immediately saving to browser LocalStorage.
 * 
 * 5. ROUTING & NAVIGATION (Card click -> Full Page):
 *    - `<Link to="...">` from `react-router-dom` sends the user to the detail
 *      page matching the entity's slug (e.g. `/characters/:slug`).
 * ============================================================================
 */


/**
 * ----------------------------------------------------------------------------
 * 1. UNIVERSE CARD
 * ----------------------------------------------------------------------------
 * Displays a high-level overview of a fictional universe (e.g., MCU, Star Wars).
 * 
 * @param {Object} props.universe
 * @param {string} props.universe.slug - Unique URL route identifier
 * @param {string} props.universe.name - Display title of the universe
 * @param {string} props.universe.category - Genre category (e.g. "Cinematic Universe")
 * @param {string} props.universe.bannerImage - High-res landscape banner URL
 * @param {string} props.universe.tagline - Short franchise quote / motto
 * @param {string} props.universe.description - Concise lore synopsis
 * @param {number} props.universe.debutYear - First published or broadcast year
 */
export function UniverseCard({ universe }) {
  if (!universe) return null;

  return (
    <Link to={`/universes/${universe.slug}`} className="universe-card">
      {/* Top Banner Image with Category Pill */}
      <div className="universe-card-banner">
        <img
          src={universe.bannerImage}
          alt={universe.name}
          className="universe-card-img"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="universe-card-overlay">
          <span className="universe-card-category">{universe.category}</span>
        </div>
      </div>

      {/* Card Content & Lore Summary */}
      <div className="universe-card-body">
        <h3 className="universe-card-name">{universe.name}</h3>
        {universe.tagline && (
          <p className="universe-card-tagline">"{universe.tagline}"</p>
        )}
        <p className="universe-card-desc">{universe.description}</p>

        {/* Footer with Debut Year and CTA */}
        <div className="universe-card-stats">
          <span>{universe.debutYear ? `Since ${universe.debutYear}` : "Archived"}</span>
          <span className="universe-card-link-action">
            Enter Universe <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}


/**
 * ----------------------------------------------------------------------------
 * 2. CHARACTER CARD
 * ----------------------------------------------------------------------------
 * Displays an individual character codex profile with portrait, universe tag,
 * bio snippet, and an indicator badge if an interactive 3D model is available.
 * 
 * @param {Object} props.character
 * @param {string} props.character.id - Unique ID (used for library bookmarks)
 * @param {string} props.character.slug - URL slug (e.g. "iron-man-tony-stark")
 * @param {string} props.character.name - Hero / character name
 * @param {string} props.character.portrait - Vertical artwork/portrait URL
 * @param {string} props.character.universeName - Universe they belong to
 * @param {string} props.character.species - Species or biological enhancement
 * @param {string} props.character.firstAppearance - Debut work or chapter
 * @param {string} props.character.biography - Narrative lore introduction
 * @param {string} [props.character.localModel] - Path to .glb file if 3D model exists
 */
export function CharacterCard({ character }) {
  // Get library actions from React Context (see dataStore.jsx → LibraryProvider)
  const { isInLibrary, addItem, removeItem } = useLibrary();

  if (!character) return null;

  const saved = isInLibrary(character.id);

  // Toggle bookmark in personal library without opening the card link
  const handleLibraryToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        universeName: character.universeName,
      }, "bookmarked");
    }
  };

  return (
    <Link to={`/characters/${character.slug}`} className="character-card">
      {/* Portrait Media Area */}
      <div className="character-card-media">
        <img
          src={character.portrait}
          alt={character.name}
          className="character-card-img"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* 3D Model Badge (Shown only if character has a local 3D .glb file) */}
        {character.localModel && (
          <div className="character-card-3d-indicator">
            <Box size={13} />
            <span>3D Model</span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="character-card-content">
        <div className="character-card-universe">{character.universeName}</div>
        <h3 className="character-card-name">{character.name}</h3>

        <div className="character-card-meta">
          <span>{character.species || "Character"}</span>
          {character.firstAppearance && (
            <>
              <span aria-hidden="true">·</span>
              <span>{character.firstAppearance.split("(")[0]}</span>
            </>
          )}
        </div>

        <p className="character-card-desc">{character.biography}</p>

        {/* Footer Action & Bookmark Button */}
        <div className="character-card-footer">
          <span className="character-card-cta">
            Read Codex <ArrowRight size={13} />
          </span>

          <button
            type="button"
            onClick={handleLibraryToggle}
            className={`character-card-bookmark-btn ${saved ? "active" : ""}`}
            title={saved ? "Remove from Library" : "Bookmark to Library"}
            aria-label={saved ? "Remove from Library" : "Bookmark to Library"}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </Link>
  );
}


/**
 * ----------------------------------------------------------------------------
 * 3. MEDIA CARD
 * ----------------------------------------------------------------------------
 * Displays a work of fiction across any medium (Movie, TV Series, Anime, 
 * Manga, Webtoon, Novel, or Book).
 * 
 * @param {Object} props.media
 * @param {string} props.media.id - Unique ID
 * @param {string} props.media.slug - Route parameter for /media/:slug
 * @param {string} props.media.title - Title of work
 * @param {string} props.media.type - Type ("movie" | "anime" | "manga" | "novel" etc.)
 * @param {string} props.media.coverImage - Vertical poster / cover art URL
 * @param {string} props.media.universeName - Parent universe name
 * @param {number} props.media.releaseYear - Year of release
 * @param {string} [props.media.runtime] - Running time (movies)
 * @param {string} [props.media.seasons] - Season count (series)
 * @param {string} props.media.synopsis - Plot summary
 */
export function MediaCard({ media }) {
  const { isInLibrary, addItem, removeItem } = useLibrary();

  if (!media) return null;

  const saved = isInLibrary(media.id);

  // Save to watchlist or readlist depending on the media medium
  const handleLibraryToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeItem(media.id);
    } else {
      const defaultStatus = ["manga", "manhwa", "novel", "book"].includes(media.type)
        ? "plan_to_read"
        : "plan_to_watch";
      addItem({
        id: media.id,
        slug: media.slug,
        title: media.title,
        type: media.type,
        category: media.category,
        coverImage: media.coverImage,
        universeName: media.universeName,
      }, defaultStatus);
    }
  };

  return (
    <Link to={`/media/${media.slug}`} className="media-card">
      {/* Poster with Format Badge */}
      <div className="media-card-poster">
        <img
          src={media.coverImage}
          alt={media.title}
          className="media-card-img"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <span className="media-card-type-chip">{media.type}</span>
      </div>

      {/* Meta & Synopsis */}
      <div className="media-card-content">
        <div className="media-card-universe">{media.universeName}</div>
        <h3 className="media-card-title">{media.title}</h3>

        <div className="media-card-meta">
          <span>{media.releaseYear}</span>
          {media.runtime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{media.runtime}</span>
            </>
          )}
          {media.seasons && (
            <>
              <span aria-hidden="true">·</span>
              <span>{media.seasons}</span>
            </>
          )}
        </div>

        <p className="media-card-synopsis">{media.synopsis}</p>

        {/* Footer Actions */}
        <div className="media-card-footer">
          <span className="media-card-cta">
            View Entry <ArrowRight size={13} />
          </span>

          <button
            type="button"
            onClick={handleLibraryToggle}
            className={`media-card-bookmark-btn ${saved ? "active" : ""}`}
            title={saved ? "Remove from Library" : "Add to Library"}
            aria-label={saved ? "Remove from Library" : "Add to Library"}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </Link>
  );
}


/**
 * ----------------------------------------------------------------------------
 * 4. ARTICLE CARD
 * ----------------------------------------------------------------------------
 * Displays a canonical wiki lore article (e.g. "The Infinity Stones", 
 * "The Force", "Shadow Monarch Power Structure", "The Coordinate").
 * 
 * @param {Object} props.article
 * @param {string} props.article.id - Unique ID
 * @param {string} props.article.slug - Route parameter for /articles/:slug
 * @param {string} props.article.title - Article headline
 * @param {string} props.article.category - Category (e.g. "Cosmic Artifacts")
 * @param {string} props.article.universeName - Parent franchise name
 * @param {string} props.article.summary - Overview excerpt
 * @param {string} props.article.lastUpdated - Date string of last revision
 */
export function ArticleCard({ article }) {
  const { isInLibrary, addItem, removeItem } = useLibrary();

  if (!article) return null;

  const saved = isInLibrary(article.id);

  const handleLibraryToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeItem(article.id);
    } else {
      addItem({
        id: article.id,
        slug: article.slug,
        title: article.title,
        type: "article",
        category: article.category,
        universeName: article.universeName,
      }, "bookmarked");
    }
  };

  return (
    <Link to={`/articles/${article.slug}`} className="article-card">
      <div className="article-card-header">
        <span className="article-card-universe">{article.universeName}</span>
        <span className="article-card-type">{article.category}</span>
      </div>

      <h3 className="article-card-title">{article.title}</h3>
      <p className="article-card-summary">{article.summary}</p>

      <div className="article-card-footer">
        <span>Updated {article.lastUpdated}</span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLibraryToggle}
            className={`p-1.5 rounded transition-colors ${
              saved ? "text-amber-700 bg-amber-50" : "text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            }`}
            title={saved ? "Remove bookmark" : "Bookmark article"}
            aria-label={saved ? "Remove bookmark" : "Bookmark article"}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
          </button>
          <span className="article-card-read-more">
            Read Wiki <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Default export bundles all cards under a unified namespace
export default {
  UniverseCard,
  CharacterCard,
  MediaCard,
  ArticleCard,
};
