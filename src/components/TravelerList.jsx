import { useState, useEffect, useRef } from "react";
export default function TravelerList({
  travelers,
  openTravelerDetails,
  loading,
  loadingText,
  error,
  icons,
  travelersList,
}) {
  const list = [...travelersList];
  const inputRef = useRef();
  const timer = useRef(null);
  const [openSearchResultsWindow, setOpenSearchResultsWindow] = useState(false);
  const [resultsFound, setResultsFound] = useState();
  const [searchResults, setSearchResults] = useState();
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [visibleSearchItems, setVisibleSearchItems] = useState(new Set());
  const firstLetter = useRef(null);

  function handleSearchTimer(callback, delay) {
    if (inputRef.current.value.length === 1) {
      firstLetter.current = inputRef.current.value;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(firstLetter.current);
      timer.current = null;
    }, delay);
  }

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleItems((prev) => new Set(prev).add(entry.target.id));
      } else {
        setVisibleItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(entry.target.id);
          return newSet;
        });
      }
    });
  }
  function handleSearchIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSearchItems((prev) => new Set(prev).add(entry.target.id));
      } else {
        setVisibleSearchItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(entry.target.id);
          return newSet;
        });
      }
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
    });

    travelers.forEach((traveler, index) => {
      const cardElement = document.getElementById(`traveler-${index}`);
      if (cardElement) {
        observer.observe(cardElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [travelers]);

  function handleSearch(firstLetter) {
    if (firstLetter) {
      list.sort((a, b) => {
        const aStarts = a.name
          .toLowerCase()
          .startsWith(firstLetter.toLowerCase());
        const bStarts = b.name
          .toLowerCase()
          .startsWith(firstLetter.toLowerCase());

        if (aStarts && !bStarts) return -1; // a comes first
        if (!aStarts && bStarts) return 1; // b comes first
        return a.name.localeCompare(b.name);
      });
    }

    if (inputRef.current.value.length > 0) {
      setOpenSearchResultsWindow(true);
      setSearchResults(
        list.filter((traveler) =>
          traveler.name
            .toLowerCase()
            .includes(inputRef.current.value.toLowerCase())
        )
      );
    } else {
      setOpenSearchResultsWindow(false);
    }
  }
  function handleClickOutside(e) {
    if (document.getElementById("searchContainer").contains(e.target)) {
    } else {
      setOpenSearchResultsWindow(false);
    }
  }
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setResultsFound(true);
      const observer = new IntersectionObserver(handleSearchIntersection, {
        root: null,
        rootMargin: "0px",
      });

      searchResults.forEach((traveler, index) => {
        const cardElement = document.getElementById(
          `searchedTraveler-${index}`
        );

        if (cardElement) {
          observer.observe(cardElement);
        }
      });

      return () => {
        observer.disconnect();
      };
    } else if (searchResults && searchResults.length === 0) {
      setResultsFound(false);
      clearTimeout(timer.current);
    }
  }, [searchResults]);

  useEffect(() => {
    if (openSearchResultsWindow) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
      clearTimeout(timer.current);
    }
  }, [openSearchResultsWindow]);
  return (
    <>
      {!loading && !error && (
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
          {/* Switch this to resultsFound check instead of openSearch */}
          {openSearchResultsWindow && (
            // Use pt-10 to set dynamic heights
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
                  const isVisible = visibleSearchItems.has(
                    `searchedTraveler-${i}`
                  );

                  const types = Array.isArray(traveler.types)
                    ? traveler.types
                    : typeof traveler.types === "string"
                    ? [traveler.types]
                    : [];

                  return (
                    <div
                      className="w-full h-18 flex gap-2 relative border-b-1"
                      onClick={() => openTravelerDetails(traveler)}
                      key={i}
                      id={`searchedTraveler-${i}`}
                    >
                      {isVisible ? (
                        <>
                          <div className="w-15 h- flex flex-col">
                            <div className="flex-1 bg-indigo-950 overflow-hidden flex items-center justify-center">
                              <img src={traveler.avatar} className="h-13" />

                              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs z-1">
                                <img
                                  className="size-3"
                                  // #BUG - Change url paths or well completely remove the path and use a preset path with models
                                  src={`${
                                    icons.genders[
                                      icons.genders.findIndex((gender) =>
                                        gender.filename.includes(
                                          traveler.gender.toLowerCase()
                                        )
                                      )
                                    ].url
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center gap-1">
                            <div className="flex gap-1 h-3 items-center">
                              <p className="text-nowrap text-[10px] text-center px-2 rounded-xl bg-indigo-200">
                                {traveler.job}
                              </p>

                              <div className="flex h-3">
                                {types.map((type, i) => {
                                  // #BUG - Change url paths or well completely remove the path and use a preset path with models

                                  return (
                                    <img
                                      key={i}
                                      src={`${
                                        icons.types[
                                          icons.types.findIndex((gender) =>
                                            gender.filename.includes(type)
                                          )
                                        ].url
                                      }`}
                                      alt={type}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <p className="text-xs font-bold">
                                {traveler.name}
                              </p>
                              <p className="text-xs">{traveler.rank}</p>
                            </div>
                            <div className="flex gap-1 items-center">
                              <p className="text-xs font-bold">
                                {traveler.influence}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {travelers.length === 0 && (
        <div
          className={`flex items-center justify-center ${
            error ? "bg-red-200" : "bg-indigo-500"
          } w-[90%] min-h-[30px] overflow-auto p-5 rounded border border-white`}
        >
          {loading && (
            <div className="flex gap-5 items-center justify-center">
              <div className="flex gap-2 flex-col">
                <p className="text-sm">{loadingText}...</p>
                <h2 className="self-end font-semibold italic">
                  - Solon Probably
                </h2>
              </div>
              <div className="min-w-20 flex items-center justify-center">
                <img src="loading.webp" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex gap-5 items-center justify-center">
              <div className="flex gap-2 flex-col">
                <p className="text-sm text-red-400">{loadingText}...</p>
                <h2 className="self-end font-semibold italic">
                  - Solon Probably
                </h2>
              </div>
              <div className="min-w-20 flex items-center justify-center">
                <img src="loading.webp" />
              </div>
            </div>
          )}
          {!loading && !error && <p>No Travelers Found</p>}
        </div>
      )}
      {travelers.length > 0 && !loading && !error && (
        <div className="grid w-[90%] max-h-[70dvh] bg-indigo-500 grid-cols-1 gap-2 overflow-auto p-5 rounded border border-white">
          {travelers.map((traveler, i) => {
            const isVisible = visibleItems.has(`traveler-${i}`);

            const types = Array.isArray(traveler.types)
              ? traveler.types
              : typeof traveler.types === "string"
              ? [traveler.types]
              : [];

            return (
              <div
                className="h-30 flex gap-2 border-2 border-black relative"
                key={i}
                id={`traveler-${i}`}
                onClick={() => openTravelerDetails(traveler)}
              >
                {isVisible ? (
                  // If visible, render the content
                  <>
                    <div className="w-22 h- flex flex-col border-r-2">
                      <p className="text-nowrap text-sm text-center bg-indigo-400">
                        {traveler.job}
                      </p>
                      <div className="flex-1 bg-indigo-950 overflow-hidden flex items-center justify-center">
                        <img src={traveler.avatar} className="h-20" />

                        <div className="absolute bottom-[-5px] left-[-6px] w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                          <img
                            className="size-4"
                            // #BUG - Change url paths or well completely remove the path and use a preset path with models
                            src={`${
                              icons.genders[
                                icons.genders.findIndex((gender) =>
                                  gender.filename.includes(
                                    traveler.gender.toLowerCase()
                                  )
                                )
                              ].url
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p>{traveler.name}</p>
                      <p>{traveler.rank}</p>
                      <div className="flex">
                        {types.map((type, i) => {
                          // #BUG - Change url paths or well completely remove the path and use a preset path with models

                          return (
                            <img
                              key={i}
                              src={`${
                                icons.types[
                                  icons.types.findIndex((gender) =>
                                    gender.filename.includes(type)
                                  )
                                ].url
                              }`}
                              alt={type}
                            />
                          );
                        })}
                      </div>
                      <p>{traveler.influence}</p>
                    </div>
                  </>
                ) : (
                  // If not visible, render a placeholder
                  ""
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
