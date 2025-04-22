import { useState, useEffect } from "react";
import "./App.css";
import TravelerList from "./components/TravelerList";
import { travelers } from "./helpers/filterCharacters.js";
import fetchCharacters from "./helpers/fetchCharacters.js";
import Button from "./components/Button";
import { createPortal } from "react-dom";
import FiltersMenu from "./components/FiltersMenu";

export default function App() {
  const [filters, setFilters] = useState({
    job: "",
    gender: "",
    types: [],
    influence: "",
    startingRank: "",
    highestRank: "",
  });
  const [travelersData, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTravelers, setFilteredTravelers] = useState();
  const [filtersTab, setFiltersTab] = useState(false);
  const [activeFilter, setActiveFilter] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCharacters();
      setTravelers(data);
      setLoading(false);
      setFilteredTravelers(travelers);
    }

    fetchData();
  }, []);
  function applyFilters(value, minRank, maxRank) {
    console.log(minRank);
    setFilters((prev) => {
      if (travelers.jobs.includes(value))
        return { ...prev, job: prev.job.includes(value) ? "" : value };

      if (travelers.genders.includes(value))
        return { ...prev, gender: prev.gender.includes(value) ? "" : value };

      if (travelers.influences.includes(value))
        return {
          ...prev,
          influence: prev.influence.includes(value) ? "" : value,
        };

      if (travelers.ranks.includes(value) && minRank)
        return {
          ...prev,
          startingRank: prev.startingRank === value ? "" : value,
        };
      if (travelers.ranks.includes(value) && maxRank)
        return {
          ...prev,
          highestRank: prev.highestRank === value ? "" : value,
        };

      if (travelers.types.includes(value)) {
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

  useEffect(() => {
    if (travelersData.length > 0) {
      travelers.resetFilters();

      if (filters.job) travelers.filterByJob(filters.job);
      if (filters.gender) travelers.filterByGenders(filters.gender);
      if (filters.influence) travelers.filterByInfluence(filters.influence);
      if (filters.startingRank)
        travelers.filterByStartingRank(filters.startingRank);
      if (filters.highestRank)
        travelers.filterByHighestRank(filters.highestRank);

      if (filters.types.length > 0) travelers.filterByType(...filters.types);

      setFilteredTravelers([...travelers.filteredTravelers]);
    }
  }, [filters]);

  useEffect(() => {
    const newActiveFilter = {};

    for (const key in filters) {
      const value = filters[key];

      if (Array.isArray(value)) {
        // If it's an array (like 'types'), add each value to activeFilter
        value.forEach((item) => {
          newActiveFilter[`${key}:${item}`] = true;
        });
      } else if (value) {
        // If it's a non-empty string, add it
        newActiveFilter[`${key}:${value}`] = true;
      }
    }

    setActiveFilter(newActiveFilter);
    console.log(filters);
  }, [filteredTravelers]);
  console.log(activeFilter);

  function openFiltersTab() {
    setFiltersTab(true);
  }

  function handleResetFilters() {
    travelers.resetFilters();
    setFilteredTravelers([...travelers.unsortedTravelers]);
    setFilters({
      job: "",
      gender: "",
      types: [],
      influence: "",
      startingRank: "",
      highestRank: "",
    });
    setFiltersTab(false);
    setActiveFilter({});
  }
  function closeFiltersWindow() {
    setFiltersTab(false);
  }

  return (
    <div className="bg-black h-full w-full flex items-center flex-col gap-5 overflow-hidden">
      <div className="flex justify-between w-full px-5 pt-5">
        <div className="flex gap-2 items-center">
          {!loading && <p className="text-white">{travelersData.length}</p>}
          <p className="text-white">Favorite</p>
        </div>
        <div className="flex gap-2  items-center">
          <p className="text-white">Sort</p>
          <Button onClick={openFiltersTab}>Filter</Button>
        </div>
      </div>
      <TravelerList
        isLoading={loading}
        travelers={
          filteredTravelers ? travelers.filteredTravelers : travelersData
        }
      />
      {filtersTab &&
        createPortal(
          <div className="flex flex-col overflow-auto gap-10 w-[100vw] h-[100vh] p-15 items-center bg-[#000000d0]">
            <FiltersMenu
              filterList={travelers}
              activeFilters={activeFilter}
              handleReset={handleResetFilters}
              handleClose={closeFiltersWindow}
              handleFilterToggle={handleFilterToggle}
            />
          </div>,
          document.getElementById("filtersMenu")
        )}
    </div>
  );
}
