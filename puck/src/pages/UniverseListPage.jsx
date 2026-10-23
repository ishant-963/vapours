import React, { useState, useMemo } from "react";
import { contentService } from "../dataStore.jsx";
import { UniverseCard } from "../components/Cards.jsx";
import FilterBar from "../components/common/FilterBar.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import "./UniverseListPage.css";

export default function UniverseListPage() {
  const allUniverses = contentService.getAllUniverses();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredUniverses = useMemo(() => {
    let result = [...allUniverses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q) ||
          u.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "title-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => (b.debutYear || 0) - (a.debutYear || 0));
    } else if (sortBy === "year-asc") {
      result.sort((a, b) => (a.debutYear || 0) - (b.debutYear || 0));
    }

    return result;
  }, [allUniverses, searchQuery, sortBy]);

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: "Universes" }]} />

      <header className="universe-list-header">
        <div className="universe-list-kicker">Fictional Continuities & Realities</div>
        <h1 className="universe-list-title">Explore All Universes</h1>
        <p className="universe-list-desc">
          Browse interconnected fictional universes across cinematic sagas, fantasy mythologies, anime realms, and original story dimensions.
        </p>
      </header>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredUniverses.length}
      />

      <div className="grid-cards">
        {filteredUniverses.map((universe) => (
          <UniverseCard key={universe.id} universe={universe} />
        ))}
      </div>
    </div>
  );
}
