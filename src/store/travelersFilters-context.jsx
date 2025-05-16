import { createContext, useContext, useState, useEffect, useRef } from "react";
import filters from "../helpers/filterCharacters.js";
import { DataContext } from "./travelersData-context.jsx";
import { UIContext } from "./travelersUI-context.jsx";
import { useLocation } from "react-router-dom";
import { UserContext } from "./userData-context.jsx";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const location = useLocation();

  const { data } = useContext(DataContext);
  const {
    uiState,
    playSound,
    setUiState,
    handleCloseFilterWindow,
    setVisibleItems,
    observeElements,
    createIntersectionHandler,
  } = useContext(UIContext);
  const { user } = useContext(UserContext);

  const [activeFilters, setActiveFilters] = useState({
    job: "",
    gender: "",
    types: [],
    influence: "",
    startingRank: "",
    highestRank: "",
  });
  const [travelerFilters, setTravelerFilters] = useState([]);
  const [enabled, setEnabled] = useState({});
  const [disableMaxRanks, setDisableMaxRanks] = useState(false);

  const travelerListRef = useRef(null);

  function applyFilters(value, minRank, maxRank) {
    setActiveFilters((prev) => {
      if (travelerFilters.jobs.includes(value))
        return { ...prev, job: prev.job.includes(value) ? "" : value };

      if (travelerFilters.genders.includes(value))
        return { ...prev, gender: prev.gender.includes(value) ? "" : value };

      if (travelerFilters.influences.includes(value))
        return {
          ...prev,
          influence: prev.influence.includes(value) ? "" : value,
        };

      if (travelerFilters.ranks.includes(value) && minRank)
        return {
          ...prev,
          startingRank: prev.startingRank === value ? "" : value,
        };
      if (travelerFilters.ranks.includes(value) && maxRank)
        return {
          ...prev,
          highestRank: prev.highestRank === value ? "" : value,
        };

      if (travelerFilters.types.includes(value)) {
        return {
          ...prev,
          types: prev.types.includes(value)
            ? prev.types.filter((type) => type !== value)
            : [...prev.types, value],
        };
      }

      return prev;
    });
  }

  function handleFilterToggle(filterName, filterList, category) {
    if (category === "startingRank") {
      if (filterName === "★★★★★") {
        setDisableMaxRanks((prev) => !prev);
      } else {
        setDisableMaxRanks(false);
      }
    }

    if (disableMaxRanks && category === "highestRank") {
      playSound("deny");
      return;
    }

    let min = false;
    let max = false;
    if (filterList[0] === "★★★") min = true;
    if (filterList[0] === "★★★★★") max = true;

    applyFilters(filterName, min, max);
  }

  function handleResetFilters() {
    playSound("reset");
    travelerFilters.resetFilters();

    setActiveFilters({
      job: "",
      gender: "",
      types: [],
      influence: "",
      startingRank: "",
      highestRank: "",
    });
    handleCloseFilterWindow();
    setDisableMaxRanks(false);
  }
  useEffect(() => {
    if (data.travelers) {
      setTravelerFilters(new filters(data.travelers));
    }
  }, [data.travelers]);

  useEffect(() => {
    if (travelerFilters.length !== 0) {
      travelerFilters.resetFilters();
    }
  }, [travelerFilters, activeFilters]);

  useEffect(() => {
    if (!travelerListRef.current || data.loading || location.pathname !== "/")
      return;

    let targets = [];

    if (uiState.openFavorites && user) {
      targets = user.favorites.map((id) =>
        data.travelers.find((t) => t._id === id)
      );
    } else if (!activeFilters) {
      targets = data.travelers;
    } else {
      targets = travelerFilters.filteredTravelers;
    }

    const cleanup = observeElements(
      createIntersectionHandler(setVisibleItems),
      targets,
      "traveler"
    );

    setUiState((prev) => {
      return {
        ...prev,
        travelerCount: targets.length,
      };
    });

    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }, [
    data.loading,
    enabled,
    uiState.openFavorites,
    user?.favorites,
    data.travelers,
    location,
    travelerFilters,
  ]);

  useEffect(() => {
    if (!data.loading) {
      const filterMap = {
        job: travelerFilters.filterByJob,
        gender: travelerFilters.filterByGenders,
        influence: travelerFilters.filterByInfluence,
        startingRank: travelerFilters.filterByStartingRank,
        highestRank: travelerFilters.filterByHighestRank,
      };

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (key === "types" && value.length > 0) {
          travelerFilters.filterByType(...value);
        } else if (filterMap[key] && value) {
          filterMap[key].call(travelerFilters, value);
        }
      });

      const enabledFilters = Object.entries(activeFilters).reduce(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => (acc[`${key}:${item}`] = true));
          } else if (value) {
            acc[`${key}:${value}`] = true;
          }
          return acc;
        },
        {}
      );
      const toggleSound =
        (!disableMaxRanks && uiState.openFilterWindow) ||
        (uiState.openFilterWindow &&
          disableMaxRanks &&
          activeFilters.highestRank === "");

      if (toggleSound) {
        playSound("toggle");
      }
      setEnabled(enabledFilters);
    }
  }, [activeFilters, data.loading]);

  useEffect(() => {
    if (
      uiState.openFilterWindow &&
      disableMaxRanks &&
      activeFilters.highestRank !== ""
    ) {
      setActiveFilters((prev) => ({
        ...prev,
        highestRank: "",
      }));
    }
  }, [disableMaxRanks]);

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        travelerFilters,
        enabled,
        disableMaxRanks,
        handleResetFilters,
        handleFilterToggle,
        handleCloseFilterWindow,
        travelerListRef,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
