import React from "react";
import EmptyState from "./common/EmptyState.jsx";
import FilterBar from "./common/FilterBar.jsx";
import Icons from "./common/icons.jsx";

/**
 * ============================================================================
 * LOREVERSE COMMON UI UTILITIES SUITE
 * ============================================================================
 * 
 * --- DATA & FILTERING FLOW FOR BEGINNERS ---
 * 
 * 1. SEARCH & FILTERING PIPELINE (`FilterBar`):
 *    - Parent page holds filter state in React:
 *        const [searchQuery, setSearchQuery] = useState("");
 *        const [selectedUniverse, setSelectedUniverse] = useState("all");
 *        const [sortBy, setSortBy] = useState("featured");
 *    - `FilterBar` is a "controlled component" — it receives these values as
 *      props and calls back (`onSearchChange`, `onUniverseChange`, `onSortChange`)
 *      whenever the user types or picks a dropdown option.
 * 
 * 2. MEMOIZED FILTERING:
 *    - The parent page filters the array with `useMemo()`:
 *        const filtered = useMemo(() => {
 *          return allItems.filter(item => item.title.includes(searchQuery));
 *        }, [allItems, searchQuery, ...]);
 * 
 * 3. FALLBACK WHEN EMPTY (`EmptyState`):
 *    - When `filtered.length === 0`, the page gracefully renders:
 *        <EmptyState 
 *          title="No records found" 
 *          description="Try adjusting your search query or filters."
 *          actionText="Reset Search"
 *        />
 * ============================================================================
 */

export { EmptyState, FilterBar, Icons };

export default {
  EmptyState,
  FilterBar,
  Icons,
};
