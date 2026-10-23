import React from "react";
import { Search } from "./icons.jsx";
import "./FilterBar.css";

export default function FilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions = [
    { value: "featured", label: "Featured Curation" },
    { value: "title-asc", label: "Title (A–Z)" },
    { value: "title-desc", label: "Title (Z–A)" },
    { value: "year-desc", label: "Release (Newest First)" },
    { value: "year-asc", label: "Release (Oldest First)" },
  ],
  universes = [],
  selectedUniverse = "all",
  onUniverseChange,
  genres = [],
  selectedGenre = "all",
  onGenreChange,
  totalResults = 0
}) {
  return (
    <div className="filter-bar-wrap" aria-label="Search and Filter Controls">
      <div className="filter-bar-main">
        <div className="filter-search-box">
          <Search size={15} className="filter-search-icon" />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search by title, creator, or keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-controls-group">
          {universes && universes.length > 0 && onUniverseChange && (
            <select
              className="filter-select"
              value={selectedUniverse}
              onChange={(e) => onUniverseChange(e.target.value)}
              aria-label="Filter by universe"
            >
              <option value="all">All Universes</option>
              {universes.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          )}

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort order"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <span className="text-xs text-stone-500 font-medium">
            {totalResults} {totalResults === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>

      {genres && genres.length > 0 && onGenreChange && (
        <div className="filter-chip-row">
          <span className="filter-chip-label">Genres:</span>
          <button
            type="button"
            className={`filter-chip-btn ${selectedGenre === "all" ? "active" : ""}`}
            onClick={() => onGenreChange("all")}
          >
            All Genres
          </button>
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              className={`filter-chip-btn ${selectedGenre === g ? "active" : ""}`}
              onClick={() => onGenreChange(g)}
            >
              {g}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
