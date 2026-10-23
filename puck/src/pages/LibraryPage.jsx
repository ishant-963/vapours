import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Trash2, ArrowRight, BookOpen, Film, Layers } from "../components/common/icons.jsx";
import { useLibrary } from "../dataStore.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import "./LibraryPage.css";

const STATUS_LABELS = {
  plan_to_watch: "Plan to Watch",
  watching: "Watching",
  plan_to_read: "Plan to Read",
  reading: "Reading",
  completed: "Completed",
  bookmarked: "Bookmarked Lore"
};

export default function LibraryPage() {
  const { items, removeItem, updateStatus, clearLibrary } = useLibrary();

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    if (activeFilter === "watching") return items.filter(i => i.status === "watching" || i.status === "reading");
    if (activeFilter === "plan") return items.filter(i => i.status === "plan_to_watch" || i.status === "plan_to_read");
    if (activeFilter === "completed") return items.filter(i => i.status === "completed");
    if (activeFilter === "bookmarked") return items.filter(i => i.status === "bookmarked");
    return items;
  }, [items, activeFilter]);

  const getItemUrl = (item) => {
    if (item.type === "character") return `/characters/${item.slug}`;
    if (item.type === "article") return `/articles/${item.slug}`;
    return `/media/${item.slug}`;
  };

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: "Personal Library" }]} />

      <header className="library-header">
        <div className="library-kicker">Local Archive & Watchlist</div>
        <h1 className="library-title">My Personal Library</h1>
        <p className="library-desc">
          Your saved works, reading progress, and bookmarked lore articles. Saved locally in your browser storage.
        </p>

        <div className="library-banner-note">
          <span>
            💾 <strong>Local Storage:</strong> Your library data is stored in this browser session and persists across page reloads.
          </span>
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your local library?")) {
                  clearLibrary();
                }
              }}
              className="text-xs text-red-600 hover:underline font-semibold"
            >
              Clear Library
            </button>
          )}
        </div>
      </header>

      {/* Status Filter Tabs */}
      <div className="library-tabs">
        <button
          type="button"
          className={`library-tab-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Items ({items.length})
        </button>
        <button
          type="button"
          className={`library-tab-btn ${activeFilter === "watching" ? "active" : ""}`}
          onClick={() => setActiveFilter("watching")}
        >
          Watching & Reading
        </button>
        <button
          type="button"
          className={`library-tab-btn ${activeFilter === "plan" ? "active" : ""}`}
          onClick={() => setActiveFilter("plan")}
        >
          Plan to Watch / Read
        </button>
        <button
          type="button"
          className={`library-tab-btn ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => setActiveFilter("completed")}
        >
          Completed
        </button>
        <button
          type="button"
          className={`library-tab-btn ${activeFilter === "bookmarked" ? "active" : ""}`}
          onClick={() => setActiveFilter("bookmarked")}
        >
          Bookmarked Lore
        </button>
      </div>

      {/* Grid of Saved Items */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="Your library tab is empty"
          description="Explore universes, media, and character codices to add items to your personal watchlist or reading shelf."
          actionText="Discover Works"
          actionLink="/explore"
        />
      ) : (
        <div className="library-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="library-item-card">
              <Link to={getItemUrl(item)} className="library-item-thumb-box">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="library-item-thumb"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 text-amber-700">
                    <BookOpen size={32} />
                  </div>
                )}
                <span className="library-item-status-tag">
                  {STATUS_LABELS[item.status] || item.status}
                </span>
              </Link>

              <div className="library-item-body">
                <span className="library-item-universe">{item.universeName}</span>
                <Link to={getItemUrl(item)}>
                  <h3 className="library-item-title hover:text-amber-800 transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <div className="library-item-controls">
                  <select
                    className="library-status-select"
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                  >
                    <option value="plan_to_watch">Plan to Watch</option>
                    <option value="watching">Watching</option>
                    <option value="plan_to_read">Plan to Read</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                    <option value="bookmarked">Bookmarked Lore</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="library-remove-btn flex items-center gap-1"
                    title="Remove from library"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
