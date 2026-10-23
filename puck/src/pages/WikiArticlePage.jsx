import React from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, ArrowRight } from "../components/common/icons.jsx";
import { contentService, useLibrary } from "../dataStore.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import ArticleInfobox from "../components/wiki/ArticleInfobox.jsx";

import EmptyState from "../components/common/EmptyState.jsx";
import "./WikiArticlePage.css";

export default function WikiArticlePage() {
  const { slug } = useParams();
  const article = contentService.getArticleBySlug(slug);

  const { isInLibrary, addItem, removeItem } = useLibrary();

  if (!article) {
    return (
      <div className="page-container">
        <EmptyState
          title="Wiki Article Not Found"
          description="The requested encyclopedia entry could not be retrieved from our archives."
          actionText="Explore All Lore"
          actionLink="/explore"
        />
      </div>
    );
  }

  const saved = isInLibrary(article.id);

  const handleLibraryToggle = () => {
    if (saved) {
      removeItem(article.id);
    } else {
      addItem({
        id: article.id,
        slug: article.slug,
        title: article.title,
        type: "article",
        category: article.category,
        universeName: article.universeName
      }, "bookmarked");
    }
  };

  return (
    <div className="page-container">
      <Breadcrumbs
        items={[
          { label: "Lore Articles", path: "/explore" },
          { label: article.title }
        ]}
      />

      <header className="article-header">
        <div className="article-header-kicker">{article.universeName} · {article.category}</div>
        <h1 className="article-header-title">{article.title}</h1>
        <div className="article-header-meta">
          <span>Curated by <strong>{article.author}</strong></span>
          <span className="metadata-separator">·</span>
          <span>Updated {article.lastUpdated}</span>
          <span className="metadata-separator">·</span>
          <button
            type="button"
            onClick={handleLibraryToggle}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
              saved ? "bg-amber-100 text-amber-900" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
            <span>{saved ? "Bookmarked in Library" : "Bookmark Article"}</span>
          </button>
        </div>
      </header>

      <div className="article-page-layout">
        <main>
          {/* Lead Summary */}
          {article.summary && (
            <div className="article-summary-lead">
              "{article.summary}"
            </div>
          )}

          {/* Structured Text Sections */}
          {article.sections && article.sections.map((sec, idx) => (
            <section key={idx} className="article-body-section">
              <h2 className="article-body-heading">{sec.heading}</h2>
              <div className="article-body-text">{sec.content}</div>
            </section>
          ))}



          {/* Source Attribution Note */}
          <div className="pt-6 border-t border-stone-200 text-xs text-stone-500">
            Lore attribution: {article.sourceAttribution}. This entry synthesizes verified canonical facts and community annotations.
          </div>
        </main>

        {/* Right Infobox Column */}
        <aside>
          {article.infobox && (
            <ArticleInfobox
              title={article.title}
              subtitle={article.category}
              fields={article.infobox}
            />
          )}

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Continuity Hub
            </h4>
            <p className="text-xs text-stone-600 mb-3">
              Explore the rest of {article.universeName}.
            </p>
            <Link
              to={`/universes/${article.universeId}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:underline"
            >
              Go to Universe Hub <ArrowRight size={13} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
