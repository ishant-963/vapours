import React, { useState, useMemo } from "react";
import { contentService } from "../dataStore.jsx";
import { CharacterCard } from "../components/Cards.jsx";
import FilterBar from "../components/common/FilterBar.jsx";
import Breadcrumbs from "../components/layout/Breadcrumbs.jsx";
import "./CharacterListPage.css";

export default function CharacterListPage() {
  const characters = contentService.getAllCharacters();
  const universes = contentService.getAllUniverses();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniverse, setSelectedUniverse] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredCharacters = useMemo(() => {
    let result = [...characters];

    if (selectedUniverse !== "all") {
      result = result.filter((c) => c.universeId === selectedUniverse);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.realName?.toLowerCase().includes(q) ||
          c.species?.toLowerCase().includes(q) ||
          c.biography?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "title-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [characters, selectedUniverse, searchQuery, sortBy]);

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: "Characters" }]} />

      <header className="character-list-header">
        <div className="character-list-kicker">Heroic, Villainous & Mythical Figures</div>
        <h1 className="character-list-title">Character Codex</h1>
        <p className="character-list-desc">
          Browse profiles, abilities, faction affiliations, and interactive 3D anatomical models across all fictional continuities.
        </p>
      </header>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={[
          { value: "featured", label: "Featured Figures" },
          { value: "title-asc", label: "Name (A–Z)" },
          { value: "title-desc", label: "Name (Z–A)" },
        ]}
        universes={universes}
        selectedUniverse={selectedUniverse}
        onUniverseChange={setSelectedUniverse}
        totalResults={filteredCharacters.length}
      />

      <div className="grid-cards">
        {filteredCharacters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
