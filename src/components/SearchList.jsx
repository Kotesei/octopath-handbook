import { useContext } from "react";
import Traveler from "./Traveler";
import { SearchContext } from "../store/travelersSearch-context";

export default function SearchList({ onOpen }) {
  const {
    inputRef,
    handleSearch,
    handleSearchTimer,
    results,
    visibleSearchItems,
  } = useContext(SearchContext);
  return (
    <div
      id="searchContainer"
      className="flex w-[75%] bg-white h-8 relative rounded"
    >
      <input
        ref={inputRef}
        style={{ border: "2px solid white" }}
        className={`flex-1 px-2 text-center z-2 relative rounded ${
          onOpen
            ? `${results.found ? "bg-green-200" : "bg-red-300"}`
            : "bg-indigo-200"
        } outline-0`}
        placeholder="Search by Traveler Name"
        onClick={() => handleSearch(false)}
        onChange={() => handleSearchTimer(handleSearch, 250)}
      ></input>
      {onOpen && (
        <div
          style={{ border: "2px solid white" }}
          className="items-center absolute pt-7 bg-indigo-500 w-full z-1 rounded"
        >
          <h2
            style={{
              borderBottom:
                results.travelers.length > 0 ? "2px solid white" : "none",
            }}
            className={`w-full text-center bg-indigo-400`}
          >
            Search Results: {results.travelers.length}
          </h2>

          <div className="max-h-[35dvh] overflow-y-auto">
            {results.travelers.map((traveler, i) => {
              return (
                <Traveler
                  traveler={traveler}
                  inView={visibleSearchItems}
                  index={i}
                  key={`result-${i}`}
                  search
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
