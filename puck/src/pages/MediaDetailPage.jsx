import React from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, ExternalLink, ArrowRight, Check, Clock } from "../components/common/icons.jsx";
import { contentService, useLibrary } from "../dataStore.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import { CharacterCard } from "../components/Cards.jsx";
import ArticleInfobox from "../components/wiki/ArticleInfobox.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import "./MediaDetailPage.css";

export default function MediaDetailPage() {
  const { slug } = useParams();
  const media = contentService.getMediaBySlug(slug);

  const { isInLibrary, getItemStatus, addItem, removeItem, updateStatus } = useLibrary();

  if (!media) {
    return (
      <div className="page-container">
        <EmptyState
          title="Work Not Found"
          description="The requested media title could not be found in our directory."
          actionText="Browse Discovery"
          actionLink="/explore"
        />
      </div>
    );
  }

  const saved = isInLibrary(media.id);
  const currentStatus = getItemStatus(media.id);

  const isLiterary = ["manga", "manhwa", "novel", "book"].includes(media.type);

  const handleLibraryToggle = () => {
    if (saved) {
      removeItem(media.id);
    } else {
      addItem({
        id: media.id,
        slug: media.slug,
        title: media.title,
        type: media.type,
        category: media.category,
        coverImage: media.coverImage,
        universeName: media.universeName
      }, isLiterary ? "plan_to_read" : "plan_to_watch");
    }
  };

  // Find linked characters
  const characters = contentService.getAllCharacters().filter(c =>
    media.characterIds?.includes(c.id) || c.universeId === media.universeId
  ).slice(0, 3);

  const infoboxFields = [
    { label: "Universe", value: media.universeName },
    { label: "Format", value: media.category },
    { label: "Release Date", value: media.releaseDate || `${media.releaseYear}` },
    { label: "Director / Creator", value: media.director || media.creator },
    { label: "Author / Artist", value: media.author },
    { label: "Runtime", value: media.runtime },
    { label: "Episodes", value: media.episodes },
    { label: "Chapters", value: media.chapters },
    { label: "Viewing Order", value: media.viewingOrder },
    { label: "Attribution", value: media.sourceAttribution }
  ].filter(f => Boolean(f.value));

  return (
    <div className="page-container">
      <Breadcrumbs
        items={[
          { label: media.category, path: `/${media.type === "movie" ? "movies" : media.type === "series" ? "series" : media.type === "anime" ? "anime" : media.type === "manga" ? "manga" : media.type === "manhwa" ? "manhwa" : media.type === "novel" ? "novels" : "books"}` },
          { label: media.title }
        ]}
      />

      <div className="media-detail-layout">
        {/* Left Column: Poster & Library Status Controller */}
        <div>
          <div className="media-poster-box">
            <img
              src={media.coverImage}
              alt={media.title}
              className="media-poster-img"
              referrerPolicy="no-referrer"
            />
            <div className="media-poster-actions">
              <button
                type="button"
                onClick={handleLibraryToggle}
                className={`media-status-btn ${saved ? "saved" : "unsaved"}`}
              >
                <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
                <span>{saved ? "Saved in Library" : "Add to Library"}</span>
              </button>

              {saved && (
                <div className="pt-2 border-t border-stone-200">
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Viewing Status:
                  </label>
                  <select
                    value={currentStatus || ""}
                    onChange={(e) => updateStatus(media.id, e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded font-medium text-stone-800 outline-none"
                  >
                    {isLiterary ? (
                      <>
                        <option value="plan_to_read">Plan to Read</option>
                        <option value="reading">Currently Reading</option>
                        <option value="completed">Completed</option>
                      </>
                    ) : (
                      <>
                        <option value="plan_to_watch">Plan to Watch</option>
                        <option value="watching">Currently Watching</option>
                        <option value="completed">Completed</option>
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <ArticleInfobox
              title="Official Specifications"
              fields={infoboxFields}
            />
          </div>
        </div>

        {/* Right Column: Synopsis, Linked Characters & Universe Info */}
        <main>
          <div className="media-detail-header">
            <div className="media-detail-kicker">{media.universeName}</div>
            <h1 className="media-detail-title">{media.title}</h1>

            <div className="media-detail-meta-row mb-4">
              <span>{media.releaseYear}</span>
              <span className="metadata-separator">·</span>
              <span>{media.category}</span>
              {media.runtime && (
                <>
                  <span className="metadata-separator">·</span>
                  <span>{media.runtime}</span>
                </>
              )}
              {media.episodes && (
                <>
                  <span className="metadata-separator">·</span>
                  <span>{media.episodes}</span>
                </>
              )}
              {media.chapters && (
                <>
                  <span className="metadata-separator">·</span>
                  <span>{media.chapters}</span>
                </>
              )}
            </div>

            {media.genres && (
              <div className="flex flex-wrap gap-1.5">
                {media.genres.map((g) => (
                  <span key={g} className="media-genre-pill">
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Synopsis */}
          <section className="media-section">
            <h2 className="media-section-heading">Synopsis & Narrative Overview</h2>
            <p className="media-synopsis-text">{media.synopsis}</p>
          </section>

          {/* Universe Link */}
          <section className="media-section bg-stone-50 border border-stone-200 rounded-lg p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-1">
              Part of {media.universeName}
            </h3>
            <p className="text-xs text-stone-600 mb-3">
              Explore the full continuity, factions, and chronology of this fictional universe.
            </p>
            <Link
              to={`/universes/${media.universeId}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:underline"
            >
              Open Universe Hub <ArrowRight size={13} />
            </Link>
          </section>

          {/* Featured Cast / Characters */}
          {characters.length > 0 && (
            <section className="media-section">
              <h2 className="media-section-heading">Key Characters & Personas</h2>
              <div className="grid-cards">
                {characters.map((c) => (
                  <CharacterCard key={c.id} character={c} />
                ))}
              </div>
            </section>
          )}

          {/* External Links */}
          {media.externalUrl && (
            <div className="pt-4">
              <a
                href={media.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-800 hover:underline"
              >
                <span>Official Database / Publisher Record</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
