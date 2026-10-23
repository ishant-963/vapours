import React from "react";
import Navbar from "./layout/Navbar.jsx";
import Footer from "./layout/Footer.jsx";
import Breadcrumbs from "./layout/Breadcrumbs.jsx";

/**
 * ============================================================================
 * LOREVERSE UNIFIED LAYOUT SUITE
 * ============================================================================
 * 
 * --- DATA & NAVIGATION FLOW FOR BEGINNERS ---
 * 
 * 1. APP SHELL ARCHITECTURE (`App.jsx`):
 *    - The website is wrapped in a master shell:
 *      <div className="app-layout">
 *        <Navbar />          <-- Fixed top navigation & search triggers
 *        <main><Outlet /></main> <-- React Router renders the current page here
 *        <Footer />          <-- Global footer with links
 *        <SearchModal />     <-- Global ⌘K search overlay
 *      </div>
 * 
 * 2. ROUTER & BREADCRUMBS:
 *    - Pages pass an array of breadcrumb objects down to `<Breadcrumbs />`:
 *      <Breadcrumbs items={[{ label: "Characters", path: "/characters" }, { label: "Tony Stark" }]} />
 *    - The component generates clickable links for past steps, and marks the
 *      last element as the active page (`aria-current="page"`).
 * 
 * 3. GLOBAL SEARCH & LIBRARY TRIGGER:
 *    - The Navbar reads `useLibrary().items` to show live
 *      badge counts of bookmarked items.
 *    - Clicking the Search bar calls `useSearch().openModal()`.
 * ============================================================================
 */

export { Navbar, Footer, Breadcrumbs };

export default {
  Navbar,
  Footer,
  Breadcrumbs,
};
