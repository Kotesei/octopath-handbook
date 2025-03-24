import { useState } from "react";
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
    minrank: "",
    maxrank: "",
  });

  function applyFilters(value) {
    console.log(value);
  }
  console.log(travelers);

  return (
    <div className="bg-black h-full w-full flex items-center gap-5 overflow-hidden">
      <TravelerList travelers={travelers.unsortedTravelers} />
      <TravelerList travelers={travelers.filteredTravelers} filtered />
      <div className="flex flex-col gap-10 w-200">
        <Filter triggerFilters={applyFilters} filter={travelers.jobs} />
        <Filter triggerFilters={applyFilters} filter={travelers.genders} />
        <Filter triggerFilters={applyFilters} filter={travelers.types} />
        <Filter triggerFilters={applyFilters} filter={travelers.influences} />
      </div>
    </div>
  );
}
