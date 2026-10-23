import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Globe, User, Film, BookOpen, Scroll } from "../common/icons.jsx";
import { useSearch, searchService } from "../../dataStore.jsx";
import "./SearchModal.css";

const FILTER_TABS = [
  { id: "all", label: "All Content" },
  { id: "universe", label: "Universes" },
  { id: "character", label: "Characters" },
  { id: "movie", label: "Movies" },
  { id: "series", label: "Series" },
  { id: "anime", label: "Anime" },
  { id: "manga", label: "Manga & Manhwa" },
  { id: "article", label: "Lore Articles" },
];

export default function SearchModal() {
  const { isModalOpen, openModal, closeModal } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Keyboard shortcut listener: Cmd+K / Ctrl+K and ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isModalOpen) {
          closeModal();
        } else {
          openModal();
        }
      } else if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  // Auto focus input when opened
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm("");
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const { groups, total } = searchService.search(searchTerm, { type: activeTab });

  const handleResultClick = (url) => {
    closeModal();
    navigate(url);
  };

  const getItemIcon = (type) => {
    switch (type) {
      case "universe": return <Globe size={18} />;
      case "character": return <User size={18} />;
      case "movie":
      case "series": return <Film size={18} />;
      case "manga":
      case "manhwa":
      case "anime": return <BookOpen size={18} />;
      default: return <Scroll size={18} />;
    }
  };

  return (
    <div
      className="search-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Lore Search"
    >
      <div className="search-modal-container">
        {/* Header with Search Input */}
        <div className="search-modal-header">
          <Search size={20} className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search characters, movies, anime, novels, or universes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="search-modal-close"
            onClick={closeModal}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="search-modal-filters">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`search-filter-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="search-modal-body">
          {searchTerm.trim().length === 0 ? (
            <div className="search-modal-empty">
              <h4 className="search-modal-empty-title">Search Across Loreverse</h4>
              <p className="search-modal-empty-desc">
                Try searching for "Iron Man", "Solo Leveling", "Darth Vader", "Attack on Titan", or "Infinity Stones".
              </p>
            </div>
          ) : total === 0 ? (
            <div className="search-modal-empty">
              <h4 className="search-modal-empty-title">No entries found</h4>
              <p className="search-modal-empty-desc">
                No matching characters, works, or lore found for "{searchTerm}".
              </p>
            </div>
          ) : (
            <div>
              {/* Universes Group */}
              {groups.universes && groups.universes.length > 0 && (
                <div>
                  <div className="search-group-title">Universes</div>
                  {groups.universes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="search-result-item"
                      style={{ width: "100%", textAlign: "left" }}
                      onClick={() => handleResultClick(item.url)}
                    >
                      <div className="search-result-icon-box">{getItemIcon(item.type)}</div>
                      <div className="search-result-info">
                        <div className="search-result-title">{item.title}</div>
                        <div className="search-result-subtitle">{item.subtitle}</div>
                      </div>
                      <span className="search-result-type-tag">Universe</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Characters Group */}
              {groups.characters && groups.characters.length > 0 && (
                <div>
                  <div className="search-group-title">Characters</div>
                  {groups.characters.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="search-result-item"
                      style={{ width: "100%", textAlign: "left" }}
                      onClick={() => handleResultClick(item.url)}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="search-result-thumb"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="search-result-icon-box">{getItemIcon(item.type)}</div>
                      )}
                      <div className="search-result-info">
                        <div className="search-result-title">{item.title}</div>
                        <div className="search-result-subtitle">{item.subtitle}</div>
                      </div>
                      <span className="search-result-type-tag">Character</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Media Group */}
              {groups.media && groups.media.length > 0 && (
                <div>
                  <div className="search-group-title">Cinema, Series & Literature</div>
                  {groups.media.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="search-result-item"
                      style={{ width: "100%", textAlign: "left" }}
                      onClick={() => handleResultClick(item.url)}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="search-result-thumb"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="search-result-icon-box">{getItemIcon(item.type)}</div>
                      )}
                      <div className="search-result-info">
                        <div className="search-result-title">{item.title}</div>
                        <div className="search-result-subtitle">{item.subtitle}</div>
                      </div>
                      <span className="search-result-type-tag">{item.type}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Articles Group */}
              {groups.articles && groups.articles.length > 0 && (
                <div>
                  <div className="search-group-title">Wiki Lore Articles</div>
                  {groups.articles.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="search-result-item"
                      style={{ width: "100%", textAlign: "left" }}
                      onClick={() => handleResultClick(item.url)}
                    >
                      <div className="search-result-icon-box">{getItemIcon(item.type)}</div>
                      <div className="search-result-info">
                        <div className="search-result-title">{item.title}</div>
                        <div className="search-result-subtitle">{item.subtitle}</div>
                      </div>
                      <span className="search-result-type-tag">Lore</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="search-modal-footer">
          <span>{total} total results found</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
