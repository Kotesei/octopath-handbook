import { useContext } from "react";
import Traveler from "./Traveler";
import { SearchContext } from "../store/travelersSearch-context";

export default function SearchList({ onOpen, bodyHeight, showSearchBar }) {
  const rotate = 430 > bodyHeight;
  const {
    inputRef,
    handleSearch,
    handleSearchTimer,
    handleSearchBar,
    results,
    visibleSearchItems,
  } = useContext(SearchContext);
  return (
    <>
      {((showSearchBar && rotate) || (onOpen && !rotate)) && (
        <div
          onClick={() => handleSearchBar(rotate)}
          className="absolute w-full h-full backdrop-blur-[2px] z-9 bg-[#0000004d]"
        ></div>
      )}

      {showSearchBar && (
        <div
          className={`flex justify-center w-full z-10 pointer-events-none ${
            rotate ? "h-full absolute p-6 pl-24" : ""
          }`}
        >
          <div
            id="searchContainer"
            className={`flex h-fit max-h-full pointer-events-auto ${
              rotate ? "w-[79%] max-w-180 " : "w-[75%] max-w-150"
            } relative rounded flex-col`}
          >
            <input
              id="searchContainer"
              ref={inputRef}
              style={{
                border: "2px solid var(--border-color)",
                color: `${
                  onOpen ? "var(--alt-text-color)" : "var(--text-color)"
                }`,
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
              className={`max-h-8 min-h-8 px-2 text-center z-3 ${
                onOpen ? "rounded-b-none" : ""
              } relative rounded outline-0`}
              placeholder="Search by Traveler Name"
              onClick={() => handleSearch(false)}
              onChange={() => handleSearchTimer(handleSearch, 250)}
            ></input>
            {onOpen && (
              <div
                id="searchContainer"
                style={{
                  borderTop: "none",
                  backgroundColor: "var(--container_bg-color)",
                  position: rotate ? "" : "absolute",
                }}
                className={`items-center rounded 
            ${rotate ? "" : "pt-1"}
             top-[95%] w-full z-2 overflow-hidden flex flex-col`}
              >
                <div
                  style={{ borderColor: "var(--border-color)" }}
                  id="searchContainer"
                  className="absolute w-[100%] h-[100%] border-2 border-t-0 rounded-t-none top-0 rounded z-2 pointer-events-none"
                ></div>
                <h2
                  id="searchContainer"
                  style={{
                    borderBottom: "2px solid var(--border-color)",
                    backgroundColor: "var(--container_bg-color)",
                    color: "var(--text-color)",
                  }}
                  className={`w-full text-center ${
                    results.travelers.length > 0 ? "" : "rounded-br"
                  }`}
                >
                  Search Results: {results.travelers.length}
                </h2>

                <div
                  id="searchContainer"
                  className={` ${
                    rotate ? "" : "max-h-[35dvh]"
                  } relative overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 border-l-1 w-full`}
                >
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
        </div>
      )}
    </>
  );
}
