import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import UniverseListPage from "./pages/UniverseListPage.jsx";
import UniversePage from "./pages/UniversePage.jsx";
import CharacterListPage from "./pages/CharacterListPage.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import MediaDiscoveryPage from "./pages/MediaDiscoveryPage.jsx";
import MediaDetailPage from "./pages/MediaDetailPage.jsx";
import WikiArticlePage from "./pages/WikiArticlePage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CyberfictionPage from "./pages/CyberfictionPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "explore",
        element: (
          <MediaDiscoveryPage
            categoryType="all"
            title="Entertainment Discovery"
            kicker="Unified Media Index"
            description="Explore cinema, television series, Japanese anime, Korean manhwa, serialized manga, and prose novels."
          />
        )
      },
      { path: "universes", element: <UniverseListPage /> },
      { path: "universes/:slug", element: <UniversePage /> },
      { path: "characters", element: <CharacterListPage /> },
      { path: "characters/:slug", element: <CharacterPage /> },
      {
        path: "movies",
        element: (
          <MediaDiscoveryPage
            categoryType="movie"
            title="Feature Films & Cinema"
            kicker="Silver Screen Productions"
            description="Explore theatrical blockbuster releases, superhero epics, and cinematic universe installments."
          />
        )
      },
      {
        path: "series",
        element: (
          <MediaDiscoveryPage
            categoryType="series"
            title="Television & Web Series"
            kicker="Episodic Narratives"
            description="Follow multi-season sagas, streaming limited series, and episodic universe spin-offs."
          />
        )
      },
      {
        path: "anime",
        element: (
          <MediaDiscoveryPage
            categoryType="anime"
            title="Anime Series"
            kicker="Japanese Animation"
            description="Discover acclaimed anime television series, original animations, and adapted arcs."
          />
        )
      },
      {
        path: "manga",
        element: (
          <MediaDiscoveryPage
            categoryType="manga"
            title="Serialized Manga"
            kicker="Graphic Literature"
            description="Browse original Japanese manga chapters, volume tankōbon, and long-running serials."
          />
        )
      },
      {
        path: "manhwa",
        element: (
          <MediaDiscoveryPage
            categoryType="manhwa"
            title="Manhwa & Webtoons"
            kicker="Digital Vertical Comics"
            description="Immerse in full-color Korean webtoons, hunter dungeons, and regression fantasies."
          />
        )
      },
      {
        path: "novels",
        element: (
          <MediaDiscoveryPage
            categoryType="novel"
            title="Webnovels & Light Novels"
            kicker="Serialized Prose"
            description="Read rich web serials, light novels, and foundational source texts."
          />
        )
      },
      {
        path: "books",
        element: (
          <MediaDiscoveryPage
            categoryType="book"
            title="Books & High Literature"
            kicker="Print Fantasy & Fiction"
            description="Discover legendary fantasy tomes, sci-fi worldbuilding classics, and magical archives."
          />
        )
      },
      { path: "media/:slug", element: <MediaDetailPage /> },
      { path: "articles/:slug", element: <WikiArticlePage /> },
      { path: "cyberfiction", element: <CyberfictionPage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "search", element: <Navigate to="/explore" replace /> },
      { path: "*", element: <NotFoundPage /> },
    ]
  }
]);
