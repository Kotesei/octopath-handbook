import { useContext } from "react";
import Button from "./Button";
import { FilterContext } from "../store/travelersFilters-context";
// #REFACTOR - UseContext
export default function FiltersMenu({}) {
  const {
    travelerFilters: filterList,
    enabled,
    disableMaxRanks,
    handleResetFilters: onReset,
    handleFilterToggle: onToggle,
    handleCloseFilterWindow: onClose,
  } = useContext(FilterContext);
  const {
    genders: gender,
    influences: influence,
    jobs: job,
    ranks,
    types,
  } = { ...filterList };
  const minRank = ranks.slice(0, 3);
  const maxRank = ranks.slice(2, 4);
  const allFilters = {
    job,
    types,
    influence,
    startingRank: minRank,
    highestRank: maxRank,
    gender,
  };

  return (
    <div className="h-[100dvh] w-[100dvw] absolute z-10 bg-[#0c0018e0]">
      <div className="h-[100%] p-5 gap-5 w-[100%] relative flex flex-col">
        <div className="h-[100%] items-center flex flex-col gap-2 overflow-auto">
          {Object.keys(allFilters).flatMap((filterType, i) => {
            const filterCategories = [
              "Job",
              "Types",
              "Influence",
              "Starting Rank",
              "Ending Rank",
              "Gender",
            ];
            return (
              <div
                style={{ border: "2px solid white" }}
                key={i}
                className="flex flex-col items-center w-fit rounded bg-[#1e1a3bad]"
              >
                <h2
                  style={{ borderBottom: "2px solid" }}
                  className="text-white bg-slate-800 text-2xl w-full font-bold text-center pb-1"
                >
                  {filterCategories[i]}
                </h2>
                <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center p-2">
                  {allFilters[filterType].map((filterName, i) => {
                    const key = `${filterType}:${filterName}`;
                    const disableMaxRankFilters =
                      key.includes("highestRank") && disableMaxRanks;

                    let cssClasses = `h-fit px-3 cursor-pointer rounded `;
                    if (disableMaxRankFilters) {
                      cssClasses += `${
                        enabled[key] ? "bg-slate-400" : "bg-white opacity-10"
                      }`;
                    } else {
                      cssClasses += `${
                        enabled[key]
                          ? "bg-indigo-500 text-white hover:bg-indigo-700"
                          : "bg-white hover:bg-slate-400"
                      }`;
                    }

                    return (
                      <Button
                        className={cssClasses}
                        onClick={() =>
                          onToggle(
                            filterName,
                            allFilters[filterType],
                            filterType
                          )
                        }
                        key={key}
                      >
                        {filterName}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-2 col-end-4 flex gap-5 self-end">
          <Button onClick={onReset}>Reset?</Button>
          <Button onClick={onClose}>OK</Button>
        </div>
      </div>
    </div>
  );
}
