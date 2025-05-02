import { useContext, useEffect } from "react";
import { TravelersContext } from "../store/travelers-context";
import Traveler from "./Traveler";

export default function SearchList() {
  const {
    inputRef,
    openSearchResultsWindow,
    setOpenSearchResultsWindow,
    searchResults,
    handleSearch,
    handleSearchTimer,
    timer,
    resultsFound,
    visibleSearchItems,
  } = useContext(TravelersContext);

  function handleClickOutside(e) {
    if (document.getElementById("searchContainer").contains(e.target)) {
    } else {
      setOpenSearchResultsWindow(false);
    }
  }

  useEffect(() => {
    if (openSearchResultsWindow) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
      clearTimeout(timer.current);
    }
  }, [openSearchResultsWindow]);
  return (
    <div
      id="searchContainer"
      className="flex w-[75%] bg-white h-8 relative rounded"
    >
      <input
        ref={inputRef}
        className={`flex-1 px-2 text-center z-2 relative border-2 border-white rounded ${
          openSearchResultsWindow
            ? `${resultsFound ? "bg-green-200" : "bg-red-300"}`
            : "bg-indigo-200"
        } outline-0`}
        placeholder="Search by Traveler Name"
        onClick={() => handleSearch(false)}
        onChange={() => handleSearchTimer(handleSearch, 250)}
      ></input>
      {openSearchResultsWindow && (
        <div className="items-center absolute pt-7 bg-indigo-500 border-2 border-white w-full z-1 rounded">
          <h2
            className={`${
              searchResults.length > 0 ? `border-b-2` : ""
            } w-full text-center bg-indigo-400`}
          >
            Search Results: {searchResults.length}
          </h2>

          <div className="max-h-[35dvh] overflow-y-auto">
            {searchResults.map((traveler, i) => {
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
