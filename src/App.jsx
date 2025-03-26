import { useState, useEffect } from "react";
import "./App.css";
import TravelerList from "./components/TravelerList";
import { travelers } from "./helpers/FilterCharacters";
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
  const [filteredTravelers, setFilteredTravelers] = useState(
    travelers.filteredTravelers
  );
  const [filtersTab, setFiltersTab] = useState(false);

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

  useEffect(() => {
    travelers.resetFilters();

    if (filters.job) travelers.filterByJob(filters.job);
    if (filters.gender) travelers.filterByGenders(filters.gender);
    if (filters.influence) travelers.filterByInfluence(filters.influence);
    if (filters.startingRank)
      travelers.filterByStartingRank(filters.startingRank);
    if (filters.highestRank) travelers.filterByHighestRank(filters.highestRank);

    if (filters.types.length > 0) travelers.filterByType(...filters.types);

    setFilteredTravelers([...travelers.filteredTravelers]);
  }, [filters]);

  function openFiltersTab() {
    setFiltersTab(true);
  }

  return (
    <div className="bg-black h-full w-full flex items-center flex-col gap-5 overflow-hidden">
      <div className="flex justify-between w-full px-5 pt-5">
        <div className="flex gap-2 items-center">
          <p className="text-white">{travelers.unsortedTravelers.length}</p>
          <p className="text-white">Favorite</p>
        </div>
        <div className="flex gap-2  items-center">
          <p className="text-white">Sort</p>
          <Button onClick={openFiltersTab}>Filter</Button>
        </div>
      </div>
      <TravelerList travelers={filteredTravelers} />
      {filtersTab &&
        createPortal(
          <div className="flex flex-col overflow-auto gap-10 w-[100vw] h-[100vh] p-15 items-center bg-[#000000d0]">
            <FiltersMenu filterList={travelers} triggerFilters={applyFilters} />
            {/* <Filter triggerFilters={applyFilters} filter={travelers.jobs} />
            <Filter triggerFilters={applyFilters} filter={travelers.genders} />
            <Filter
              triggerFilters={applyFilters}
              types={travelers.types}
              filter={travelers.types}
            />
            <Filter
              triggerFilters={applyFilters}
              filter={travelers.influences}
            />
            <Filter
              triggerFilters={applyFilters}
              minRank
              filter={travelers.ranks}
            />
            <Filter
              triggerFilters={applyFilters}
              maxRank
              filter={travelers.ranks}
            /> */}
          </div>,
          document.getElementById("filtersMenu")
        )}
    </div>
  );
}
