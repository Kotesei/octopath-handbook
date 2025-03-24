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
    rank: "",
  });
  const [filteredTravelers, setFilteredTravelers] = useState(
    travelers.filteredTravelers
  );

  function applyFilters(value) {
    setFilters((prev) => {
      if (travelers.jobs.includes(value)) return { ...prev, job: value };
      if (travelers.genders.includes(value)) return { ...prev, gender: value };
      if (travelers.influences.includes(value))
        return { ...prev, influence: value };
      if (travelers.ranks.includes(value)) return { ...prev, rank: value };

      if (travelers.types.includes(value)) {
        return {
          ...prev,
          types: prev.types.includes(value)
            ? prev.types.filter((t) => t !== value)
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
    if (filters.rank) travelers.filterByRank(filters.rank);
    if (filters.types.length > 0) travelers.filterByType(...filters.types);

    setFilteredTravelers([...travelers.filteredTravelers]);
  }, [filters]);

  return (
    <div className="bg-black h-full w-full flex items-center gap-5 overflow-hidden">
      <TravelerList travelers={travelers.unsortedTravelers} />
      <TravelerList travelers={filteredTravelers} filtered />
      <div className="flex flex-col gap-10 w-200">
        <Filter triggerFilters={applyFilters} filter={travelers.jobs} />
        <Filter triggerFilters={applyFilters} filter={travelers.genders} />
        <Filter triggerFilters={applyFilters} filter={travelers.types} />

        <Filter triggerFilters={applyFilters} filter={travelers.influences} />

        <Filter
          triggerFilters={applyFilters}
          filter={travelers.ranks.sort((a, b) => a.length - b.length)}
        />
      </div>
    </div>
  );
}
