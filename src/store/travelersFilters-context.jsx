import { createContext, useContext, useState, useEffect } from "react";
import filters from "../helpers/filterCharacters.js";
import { DataContext } from "./travelersData-context.jsx";
import { UIContext } from "./travelersUI-context.jsx";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const { data } = useContext(DataContext);
  const {
    uiState,
    handleCloseFilterWindow,
    setVisibleItems,
    observeElements,
    createIntersectionHandler,
  } = useContext(UIContext);

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

    if (disableMaxRanks && category === "highestRank") return;

    let min = false;
    let max = false;
    if (filterList[0] === "★★★") min = true;
    if (filterList[0] === "★★★★★") max = true;

    applyFilters(filterName, min, max);
  }

  function handleResetFilters() {
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
    if (!uiState.error) {
      setTravelerFilters(new filters(data.travelers));
    }
  }, [uiState.loading, uiState.error]);

  useEffect(() => {
    if (travelerFilters.length !== 0) {
      travelerFilters.resetFilters();
    }
  }, [travelerFilters, activeFilters]);

  useEffect(() => {
    if (
      travelerFilters.filteredTravelers &&
      travelerFilters.filteredTravelers.length > 0
    ) {
      observeElements(
        createIntersectionHandler(setVisibleItems),
        data.travelers,
        "traveler"
      );
    }
  }, [travelerFilters.filteredTravelers]);

  useEffect(() => {
    if (!uiState.loading) {
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

      setEnabled(enabledFilters);
    }
  }, [activeFilters, uiState.loading]);

  useEffect(() => {
    if (Object.keys(enabled).length > 0) {
      observeElements(
        createIntersectionHandler(setVisibleItems),
        travelerFilters.filteredTravelers,
        "traveler"
      );
    }
  }, [enabled]);

  useEffect(() => {
    if (disableMaxRanks) {
      setActiveFilters((prev) => ({
        ...prev,
        highestRank: "",
      }));
    }
  }, [disableMaxRanks]);

  useEffect(() => {}, [data.travelers]);

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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
