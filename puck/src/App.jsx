import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout.jsx";
import SearchModal from "./components/search/SearchModal.jsx";
import "./App.css";

/**
 * App — Root layout component.
 *
 * DATA FLOW:
 * ──────────
 * App wraps everything in two Context Providers so that ALL child
 * components (pages, cards, modals, navbar) can read and update:
 *
 *   1. LibraryProvider → personal bookmarks / watchlist (saved in localStorage)
 *   2. SearchProvider  → controls whether the search popup is open or closed
 *
 * Without these wrappers, the useLibrary() and useSearch() hooks
 * would throw an error because there'd be no Context to read from.
 */
export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on every navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main-content">
        <Outlet />
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
}
