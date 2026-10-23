import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../dataStore.jsx";
import { MediaCard } from "../components/Cards.jsx";
import FilterBar from "../components/common/FilterBar.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import "./MediaDiscoveryPage.css";

const CATEGORY_TABS = [
  { id: "all", label: "All Media", path: "/explore" },
  { id: "movie", label: "Movies", path: "/movies" },
  { id: "series", label: "TV Series", path: "/series" },
  { id: "anime", label: "Anime", path: "/anime" },
  { id: "manga", label: "Manga", path: "/manga" },
  { id: "manhwa", label: "Manhwa", path: "/manhwa" },
  { id: "novel", label: "Webnovels", path: "/novels" },
  { id: "book", label: "Books", path: "/books" },
  { id: "cyberfiction", label: "Cyberfiction", path: "/cyberfiction" },
];

export default function MediaDiscoveryPage({
  categoryType = "all",
  title = "Entertainment Discovery",
  kicker = "Media & Literature Catalog",
  description = "Explore canon releases across cinematic features, television, serialized manga, webtoons, and literary sagas."
}) {
  const allMedia = contentService.getAllMedia();
  const universes = contentService.getAllUniverses();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Extract all unique genres for this category
  const availableGenres = useMemo(() => {
    const relevant = categoryType === "all"
      ? allMedia
      : allMedia.filter(m => m.type.toLowerCase() === categoryType.toLowerCase());
    const set = new Set();
    relevant.forEach(m => m.genres?.forEach(g => set.add(g)));
    return Array.from(set);
  }, [allMedia, categoryType]);

  const filteredMedia = useMemo(() => {
    let result = [...allMedia];

    // Filter by type
    if (categoryType !== "all") {
      result = result.filter(m => m.type.toLowerCase() === categoryType.toLowerCase());
    }

    // Filter by universe
    if (selectedUniverse !== "all") {
      result = result.filter(m => m.universeId === selectedUniverse);
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      result = result.filter(m => m.genres?.includes(selectedGenre));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.synopsis.toLowerCase().includes(q) ||
          m.author?.toLowerCase().includes(q) ||
          m.director?.toLowerCase().includes(q) ||
          m.universeName.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
    } else if (sortBy === "year-asc") {
      result.sort((a, b) => (a.releaseYear || 0) - (b.releaseYear || 0));
    }

    return result;
  }, [allMedia, categoryType, selectedUniverse, selectedGenre, searchQuery, sortBy]);

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: title }]} />

      <header className="discovery-header">
        <div className="discovery-kicker">{kicker}</div>
        <h1 className="discovery-title">{title}</h1>
        <p className="discovery-desc">{description}</p>
      </header>

      {/* Media Type Tabs */}
      <nav className="media-type-nav-tabs" aria-label="Media category filter">
        {CATEGORY_TABS.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`media-type-tab-btn ${categoryType === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        universes={universes}
        selectedUniverse={selectedUniverse}
        onUniverseChange={setSelectedUniverse}
        genres={availableGenres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        totalResults={filteredMedia.length}
      />

      {/* Results Grid */}
      {filteredMedia.length === 0 ? (
        <EmptyState
          title="No works found"
          description="Try broadening your filter criteria or changing the search query."
          actionText="Clear Filters"
          actionLink={CATEGORY_TABS.find(t => t.id === categoryType)?.path || "/explore"}
        />
      ) : (
        <div className="grid-cards">
          {filteredMedia.map((m) => (
            <MediaCard key={m.id} media={m} />
          ))}
        </div>
      )}
    </div>
  );
}
