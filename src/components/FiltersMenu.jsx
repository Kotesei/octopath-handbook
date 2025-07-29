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
    handleOpenAdvFilters,
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
    <div className="bg-[#ffffff] min-h-10 flex justify-between items-center p-2">
      <div className="flex gap-2 overflow-auto">
        <div className="flex gap-1 items-center">
          <label htmlFor="jobFilter" className="font-semibold text-xs">
            Job
          </label>
          <select
            onChange={(e) => onToggle(e.target.value, "job")}
            id="jobFilter"
            className="bg-[#00000060] text-center py-0.5 px-1 rounded text-xs"
          >
            <option>None</option>
            {allFilters.job.map((job, i) => {
              return <option key={i}>{job}</option>;
            })}
          </select>
        </div>

        <div className="flex gap-1 items-center">
          <label htmlFor="genderFilter" className="font-semibold text-xs">
            Gender
          </label>
          <select
            onChange={(e) => onToggle(e.target.value, "gender")}
            id="genderFilter"
            className="bg-[#00000060] text-center py-0.5 px-1 rounded text-xs"
          >
            <option>None</option>
            {allFilters.gender.map((gender, i) => {
              return <option key={i}>{gender}</option>;
            })}
          </select>
        </div>

        <div className="flex gap-1 items-center">
          <label htmlFor="influenceFilter" className="font-semibold text-xs">
            Influence
          </label>
          <select
            onChange={(e) => onToggle(e.target.value, "influence")}
            id="influenceFilter"
            className="bg-[#00000060] text-center py-0.5 px-1 rounded text-xs"
          >
            <option>None</option>
            {allFilters.influence.map((influence, i) => {
              return <option key={i}>{influence}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex min-w-fit">
        <p
          onClick={handleOpenAdvFilters}
          className="bg-amber-200 px-2 py-0.5 rounded text-sm"
        >
          Advanced Filters
        </p>
        <div className="absolute h-full w-full z-1 top-0 right-1/2 translate-x-1/2 rounded p-2 flex justify-end">
          <div
            style={{
              backgroundColor: "var(--avatar_bg-color",
              borderColor: "var(--border-color",
              color: "var(--label_text-color)",
            }}
            className="bg-[#ff0000] border-2 border-black w-full max-w-75 h-fit rounded p-2 pb-4 flex flex-col gap-2"
          >
            <div className="flex justify-around">
              <div className="flex-1">
                <h2 className="text-center">Min Rank</h2>
                <div className="flex gap-1 flex-wrap items-center justify-center">
                  {allFilters.startingRank.map((min, i) => {
                    const key = `startingRank:${min}`;
                    const disabled =
                      disableMaxRanks &&
                      min ===
                        allFilters.startingRank[
                          allFilters.startingRank.length - 1
                        ][-1];

                    return (
                      <Button
                        style={{
                          color: `${
                            disabled ? "var(--button_disabled-text-color)" : ""
                          }`,
                          backgroundColor: `${disabled ? "black" : ""}`,
                          opacity: `${disabled ? "20%" : "100%"}`,
                        }}
                        className={`${
                          enabled[key]
                            ? "custom-button-enabled"
                            : "custom-button"
                        } px-1.5 rounded`}
                        onClick={(e) =>
                          onToggle(
                            e.target.innerText,
                            allFilters.startingRank,
                            "startingRank"
                          )
                        }
                        key={i}
                      >
                        {min}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-center">Max Rank</h2>
                <div className="flex gap-1 flex-wrap items-center justify-center">
                  {allFilters.highestRank.map((max, i) => {
                    const key = `highestRank:${max}`;
                    return (
                      <Button
                        style={{
                          color: `${
                            disableMaxRanks
                              ? "var(--button_disabled-text-color)"
                              : ""
                          }`,
                          backgroundColor: `${disableMaxRanks ? "black" : ""}`,
                          opacity: `${disableMaxRanks ? "20%" : "100%"}`,
                        }}
                        className={`${
                          enabled[key]
                            ? "custom-button-enabled"
                            : "custom-button"
                        } px-1.5 rounded`}
                        onClick={(e) =>
                          onToggle(
                            e.target.innerText,
                            allFilters.highestRank,
                            "highestRank"
                          )
                        }
                        key={i}
                      >
                        {max}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-center">Attack Types</h2>
              <div className="flex gap-1 flex-wrap items-center justify-center">
                {allFilters.types.map((type, i) => {
                  const key = `types:${type}`;
                  return (
                    <Button
                      onClick={(e) =>
                        onToggle(e.target.innerText, allFilters.types, "type")
                      }
                      style={{}}
                      className={`${
                        enabled[key] ? "custom-button-enabled" : "custom-button"
                      } p-1 rounded text-xs`}
                      key={i}
                    >
                      {type}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
