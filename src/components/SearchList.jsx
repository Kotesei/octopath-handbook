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
      className="flex w-[75%] max-w-150 relative rounded"
    >
      <input
        ref={inputRef}
        style={{
          border: "2px solid var(--border-color)",
          color: `${onOpen ? "var(--alt-text-color)" : "var(--text-color)"}`,
          backgroundColor: `${
            onOpen
              ? `${
                  results.found
                    ? "var(--label_bg-color)"
                    : "var(--error_bg-color)"
                }`
              : "var(--container_bg-color)"
          }`,
        }}
        className={`flex-1 px-2 text-center z-2 border-2 relative rounded  outline-0`}
        placeholder="Search by Traveler Name"
        onClick={() => handleSearch(false)}
        onChange={() => handleSearchTimer(handleSearch, 250)}
      ></input>
      {onOpen && (
        <div
          style={{
            border: "2px solid var(--border-color)",
            borderTop: "none",
            backgroundColor: "var(--container_bg-color)",
          }}
          className="items-center rounded absolute top-[50%] pt-3.5 w-full z-1"
        >
          <h2
            style={{
              borderBottom:
                results.travelers.length > 0
                  ? "1px solid var(--border-color)"
                  : "none",
              backgroundColor: "var(--container_bg-color)",
              color: "var(--text-color)",
            }}
            className={`w-full text-center`}
          >
            Search Results: {results.travelers.length}
          </h2>

          <div className="max-h-[35dvh] relative overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2">
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
