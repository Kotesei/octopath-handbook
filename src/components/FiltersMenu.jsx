import { useContext } from "react";
import Button from "./Button";
import { FilterContext } from "../store/travelersFilters-context";
export default function FiltersMenu({ onClose, theme }) {
  const {
    travelerFilters: filterList,
    enabled,
    disableMaxRanks,
    handleResetFilters: onReset,
    handleFilterToggle: onToggle,
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
    <div
      className={`${theme} h-[100dvh] w-[100dvw] absolute z-10 bg-[#0c0018e0]`}
    >
      <div className="h-[100%] p-4 gap-5 w-[100%] relative flex flex-col">
        <div className="h-[100%] items-center flex flex-col gap-2 overflow-auto p-2">
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
                style={{
                  border: "2px solid var(--border-color)",
                  backgroundColor: "var(--filter_container-bg-color)",
                }}
                key={i}
                className="flex flex-col items-center w-fit min-h-fit overflow-hidden rounded-xl"
              >
                <h2
                  style={{
                    borderBottom: "2px solid var(--border-color)",
                    color: "var(--text-color--2)",
                    backgroundColor: "var(--filter_container_title-bg-color)",
                  }}
                  className="text-2xl w-full font-bold text-center pb-1"
                >
                  {filterCategories[i]}
                </h2>
                <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center p-2">
                  {allFilters[filterType].map((filterName, i) => {
                    const key = `${filterType}:${filterName}`;
                    const disableMaxRankFilters =
                      key.includes("highestRank") && disableMaxRanks;

                    return (
                      <Button
                        style={{
                          color: `${
                            disableMaxRankFilters
                              ? "var(--button_disabled-text-color)"
                              : ""
                          }`,
                          backgroundColor: `${
                            disableMaxRankFilters ? "black" : ""
                          }`,
                          opacity: `${disableMaxRankFilters ? "20%" : "100%"}`,
                        }}
                        className={`${
                          enabled[key]
                            ? "custom-button-enabled"
                            : "custom-button"
                        } px-1.5 rounded`}
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
