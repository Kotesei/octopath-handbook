import { createContext, useEffect, useState } from "react";
import fetchCharacters from "../helpers/fetchCharacters.js";
import filters from "../helpers/filterCharacters.js";

export const TravelersContext = createContext();

export function TravelersProvider({ children }) {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFiltersTab, setOpenFiltersTab] = useState(false);
  const [travelerFilters, setTravelerFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    job: "",
    gender: "",
    types: [],
    influence: "",
    startingRank: "",
    highestRank: "",
  });
  const [enabled, setEnabled] = useState();

  useEffect(() => {
    async function loadTravelers() {
      const travelersData = await fetchCharacters();
      setTravelers(travelersData);
      setTravelerFilters(new filters(travelersData));
      setLoading(false);
    }
    loadTravelers();
  }, []);

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

  function handleFilterToggle(filterName, category) {
    let min = false;
    let max = false;
    if (category[0] === "★★★") min = true;
    if (category[0] === "★★★★") max = true;

    applyFilters(filterName, min, max);
  }

  function handleSelectTraveler({ _id: id }) {
    console.log(travelers.find((traveler) => traveler._id === id));
  }

  // App Button Functions

  function handleSortTravelers() {
    console.log("Sorting Feature here");
  }

  function handleOpenFiltersTab() {
    if (loading) return;
    setOpenFiltersTab(true);
  }

  //////////////////

  // FiltersMenu functions

  function handleResetFilters() {
    travelerFilters.resetFilters();
    setTravelers([...travelerFilters.unsortedTravelers]);
    setActiveFilters({
      job: "",
      gender: "",
      types: [],
      influence: "",
      startingRank: "",
      highestRank: "",
    });
    handleCloseFiltersWindow();
  }
  function handleCloseFiltersWindow() {
    setOpenFiltersTab(false);
  }

  /////////////////

  // Updates the filters

  useEffect(() => {
    if (!loading) {
      travelerFilters.resetFilters();
      console.log(activeFilters);

      if (activeFilters.job) travelerFilters.filterByJob(activeFilters.job);
      if (activeFilters.gender)
        travelerFilters.filterByGenders(activeFilters.gender);
      if (activeFilters.influence)
        travelerFilters.filterByInfluence(activeFilters.influence);
      if (activeFilters.startingRank)
        travelerFilters.filterByStartingRank(activeFilters.startingRank);
      if (activeFilters.highestRank)
        travelerFilters.filterByHighestRank(activeFilters.highestRank);

      if (activeFilters.types.length > 0)
        travelerFilters.filterByType(...activeFilters.types);

      setTravelers([...travelerFilters.filteredTravelers]);
      console.log(travelerFilters);
      const enabledFilters = {};

      for (const key in activeFilters) {
        const value = activeFilters[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            enabledFilters[`${key}:${item}`] = true;
          });
        } else if (value) {
          enabledFilters[`${key}:${value}`] = true;
        }
      }

      setEnabled(enabledFilters);
    }
  }, [activeFilters]);

  useEffect(() => {
    if (enabled) {
      console.log(enabled);
    }
  }, [enabled]);

  return (
    <TravelersContext.Provider
      value={{
        travelers,
        loading,
        travelerFilters,
        handleSortTravelers,
        openFiltersTab,
        handleFilterToggle,
        enabled,
        handleOpenFiltersTab,
        handleCloseFiltersWindow,
        handleSelectTraveler,
        handleResetFilters,
      }}
    >
      {children}
    </TravelersContext.Provider>
  );
}
