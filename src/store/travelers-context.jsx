import { createContext, useEffect, useState } from "react";
import fetchCharacters from "../helpers/fetchCharacters.js";
import filters from "../helpers/filterCharacters.js";
import sheepQuotes from "../../randomSheepQuote.js";

export const TravelersContext = createContext();

export function TravelersProvider({ children }) {
  const [travelers, setTravelers] = useState([]);
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const [openFiltersTab, setOpenFiltersTab] = useState(false);
  const [travelerFilters, setTravelerFilters] = useState([]);
  const [travelersList, setTravelersList] = useState([]);
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
  useEffect(() => {
    setLoadingText(sheepQuotes[Math.floor(Math.random() * sheepQuotes.length)]);
    async function loadTravelers() {
      let travelersData = await fetchCharacters();
      if (!travelersData) {
        console.log("Failed to fetch DOOO SOMETHING MAN");
        setError(true);
        setLoadingText(
          "The shepherd’s voice is lost, and the herd, without guidance, wanders in silence. The records are corrupted; the path is unclear..."
        );
        setTravelers([]);
        setTravelerFilters(new filters([]));
      } else {
        setIcons({
          genders: travelersData.genders,
          types: travelersData.types,
        });
        travelersData = travelersData.travelers;
        setTravelers(travelersData);
        setTravelersList(travelersData);
        setTravelerFilters(new filters(travelersData));
      }

      setLoading(false);
    }
    const timeoutId = setTimeout(() => {
      loadTravelers();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
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
    if (loading || error) return;
    console.log("Sorting Feature here");
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

  function handleOpenFiltersTab() {
    if (loading || error) return;
    setOpenFiltersTab(true);
  }

  //////////////////

  // FiltersMenu functions

  function handleResetFilters() {
    travelerFilters.resetFilters();
    setTravelers([...travelerFilters.unfilteredTravelers]);
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
      setActiveFilters((prev) => ({
        ...prev,
        highestRank: "",
      }));
    }
  }, [disableMaxRanks]);

  return (
    <TravelersContext.Provider
      value={{
        travelers,
        loading,
        loadingText,
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
        error,
        icons,
        travelersList,
      }}
    >
      {children}
    </TravelersContext.Provider>
  );
}
