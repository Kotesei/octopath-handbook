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
  const [enabled, setEnabled] = useState({});
  const [disableMaxRanks, setDisableMaxRanks] = useState(false);

  // Wait for fetched data

  useEffect(() => {
    async function loadTravelers() {
      const travelersData = await fetchCharacters();
      setTravelers(travelersData);
      setTravelerFilters(new filters(travelersData));
      setLoading(false);
    }
    loadTravelers();
  }, []);

  // Function for applying the filters properly

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

  // Function to handle clicking on a traveler

  function handleSelectTraveler({ _id: id }) {
    console.log(travelers.find((traveler) => traveler._id === id));
  }

  // App Button Functions

  function handleSortTravelers() {
    console.log("Sorting Feature here");
  }

  function handleFilterToggle(filterName, filterList, category) {
    console.log(filterName, filterList, category);

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
    setDisableMaxRanks(false);
  }
  function handleCloseFiltersWindow() {
    setOpenFiltersTab(false);
  }

  /////////////////

  // Updates the filters

  useEffect(() => {
    if (!loading) {
      travelerFilters.resetFilters();

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
      setTravelers([...travelerFilters.filteredTravelers]);
    }
  }, [activeFilters, loading]);

  useEffect(() => {
    if (disableMaxRanks) {
      console.log(activeFilters);
      setActiveFilters((prev) => ({
        ...prev,
        highestRank: "",
      }));
      // setEnabled((prev) => ({
      //   ...prev,
      //   ["highestRank:★★★★★"]: false,
      //   ["highestRank:★★★★★★"]: false,
      // }));
    }
  }, [disableMaxRanks]);

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
        disableMaxRanks,
      }}
    >
      {children}
    </TravelersContext.Provider>
  );
}
