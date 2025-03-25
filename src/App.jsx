import { useState, useEffect } from "react";
import "./App.css";
import TravelerList from "./components/TravelerList";
import { travelers } from "./helpers/FilterCharacters";
import Filter from "./components/Filter";

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

  function applyFilters(value, minRank, maxRank) {
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
    console.log(filters);
  }, [filters]);

  console.log(travelers);
  return (
    <div className="bg-black h-full w-full flex items-center gap-5 overflow-hidden">
      <TravelerList travelers={travelers.unsortedTravelers} />
      <TravelerList travelers={filteredTravelers} filtered />
      <div className="flex flex-col gap-10 w-200">
        <Filter triggerFilters={applyFilters} filter={travelers.jobs} />
        <Filter triggerFilters={applyFilters} filter={travelers.genders} />
        <Filter
          triggerFilters={applyFilters}
          types={travelers.types}
          filter={travelers.types}
        />
        <Filter triggerFilters={applyFilters} filter={travelers.influences} />
        <Filter
          triggerFilters={applyFilters}
          minRank
          filter={travelers.ranks}
        />
        <Filter
          triggerFilters={applyFilters}
          maxRank
          filter={travelers.ranks}
        />
      </div>
    </div>
  );
}
