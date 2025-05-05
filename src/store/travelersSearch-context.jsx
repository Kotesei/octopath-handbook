import { createContext, useRef, useState, useEffect, useContext } from "react";
import { UIContext } from "./travelersUI-context";
import { DataContext } from "./travelersData-context";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const { uiState, setUiState, observeElements, createIntersectionHandler } =
    useContext(UIContext);
  const { data } = useContext(DataContext);
  const inputRef = useRef();
  const timer = useRef(null);
  const firstLetter = useRef(null);
  const [visibleSearchItems, setVisibleSearchItems] = useState(new Set());
  const [results, setResults] = useState({
    found: false,
    travelers: [],
  });

  function handleSearch(firstLetter) {
    const travelersClone = [...data.travelers];
    setUiState((prev) => {
      return { ...prev, openSearchResultsDropdown: true };
    });
    if (firstLetter) {
      travelersClone.sort((a, b) => {
        const aStarts = a.name
          .toLowerCase()
          .startsWith(firstLetter.toLowerCase());
        const bStarts = b.name
          .toLowerCase()
          .startsWith(firstLetter.toLowerCase());

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.name.localeCompare(b.name);
      });
      setResults((prev) => {
        return {
          ...prev,
          travelers: travelersClone.filter((traveler) =>
            traveler.name
              .toLowerCase()
              .includes(inputRef.current.value.toLowerCase())
          ),
        };
      });
    }

    if (inputRef.current.value.length === 0) {
      setUiState((prev) => {
        return { ...prev, openSearchResultsDropdown: false };
      });
    }
  }

  function handleSearchTimer(callback, delay) {
    if (inputRef.current.value.length === 1) {
      firstLetter.current = inputRef.current.value;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(firstLetter.current);
      timer.current = null;
    }, delay);
  }

  useEffect(() => {
    if (results.travelers.length > 0) {
      setResults((prev) => ({
        ...prev,
        found: true,
      }));

      const cleanup = observeElements(
        createIntersectionHandler(setVisibleSearchItems),
        results.travelers,
        "result"
      );
      return cleanup;
    } else {
      setResults((prev) => ({
        ...prev,
        found: false,
      }));
      clearTimeout(timer.current);
    }
  }, [results.travelers, uiState.openSearchResultsDropdown]);

  useEffect(() => {
    if (uiState.openSearchResultsDropdown) {
    }
  }, [uiState.openSearchResultsDropdown]);

  function handleClickOutside(e) {
    if (document.getElementById("searchContainer").contains(e.target)) {
    } else {
      setUiState((prev) => {
        return { ...prev, openSearchResultsDropdown: false };
      });
    }
  }

  useEffect(() => {
    if (uiState.openSearchResultsDropdown) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
      clearTimeout(timer.current);
    }
  }, [uiState.openSearchResultsDropdown]);

  return (
    <SearchContext.Provider
      value={{
        inputRef,
        handleSearch,
        handleSearchTimer,
        results,
        visibleSearchItems,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
