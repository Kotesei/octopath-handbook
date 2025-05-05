import { createContext, useContext, useEffect, useState } from "react";
import { DataContext } from "./travelersData-context";
import sheepQuotes from "../../randomSheepQuote.js";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const { data } = useContext(DataContext);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [uiState, setUiState] = useState({
    loading: true,
    error: false,
    openSortWindow: false,
    openFilterWindow: false,
    openSearchResultsDropdown: false,
    travelerCount: 0,
    text: null,
  });

  function handleSelectTraveler({ _id: id }) {
    console.log(data.travelers.find((traveler) => traveler._id === id));
  }

  function createIntersectionHandler(intersection) {
    return function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersection((prev) => new Set(prev).add(entry.target.id));
        } else {
          intersection((prev) => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      });
    };
  }
  function observeElements(handleIntersection, element, location) {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
    });

    element.forEach((traveler, index) => {
      const cardElement = document.getElementById(`${location}-${index}`);
      if (cardElement) {
        observer.observe(cardElement);
      }
    });
    return () => {
      observer.disconnect();
    };
  }

  function handleOpenSortWindow() {
    if (uiState.loading || uiState.error) return;
    console.log("Sorting Feature here");
  }

  function handleOpenFilterWindow() {
    if (uiState.loading || uiState.error) return;
    setUiState((prev) => {
      return {
        ...prev,
        openFilterWindow: true,
      };
    });
  }

  function handleCloseFilterWindow() {
    setUiState((prev) => {
      return {
        ...prev,
        openFilterWindow: false,
      };
    });
  }

  // Set loading text
  useEffect(() => {
    setUiState((prev) => {
      return {
        ...prev,
        text: sheepQuotes[Math.floor(Math.random() * sheepQuotes.length)],
      };
    });
  }, []);

  // Set travelers count and remove loading screen
  useEffect(() => {
    if (!uiState.openFilterWindow) {
      if (!data.travelers) {
        setUiState((prev) => {
          return {
            ...prev,
            text: "The shepherd’s voice is lost, and the herd, without guidance, wanders in silence. The records are corrupted; the path is unclear...",
            error: true,
            loading: false,
            travelerCount: 0,
          };
        });
        return;
      }
      if (data.travelers.length > 0) {
        setUiState((prev) => {
          return {
            ...prev,
            travelerCount: data.travelers.length,
            loading: false,
          };
        });
        requestAnimationFrame(() => {
          const cleanup = observeElements(
            createIntersectionHandler(setVisibleItems),
            data.travelers,
            "traveler"
          );
          return cleanup;
        });
      }
    }
  }, [data.travelers, uiState.openFilterWindow]);

  return (
    <UIContext.Provider
      value={{
        uiState,
        setUiState,
        visibleItems,
        setVisibleItems,
        handleOpenSortWindow,
        handleOpenFilterWindow,
        handleCloseFilterWindow,
        handleSelectTraveler,
        observeElements,
        createIntersectionHandler,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
