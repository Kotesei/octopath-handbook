import { useContext } from "react";
import Button from "./Button";
import { FilterContext } from "../store/travelersFilters-context";
import { UIContext } from "../store/travelersUI-context";
export default function FiltersMenu({ onClose, theme }) {
  const { uiState } = useContext(UIContext);
  const {
    travelerFilters: filterList,
    enabled,
    disableMaxRanks,
    handleResetFilters: onReset,
    handleFilterToggle: onToggle,
    handleOpenAdvFilters,
    activeFilters,
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
      style={{
        backgroundColor: "var(--label_bg-color)",
        borderColor: "var(--border-color)",
      }}
      className="min-h-10 flex justify-between items-center p-2 border-b-2"
    >
      {uiState.openAdvFilters && (
        <div className="absolute w-full h-full top-0 left-0 z-1"></div>
      )}
      <div className="flex gap-2 overflow-auto px-2">
        <div className="flex gap-1 items-center">
          <label
            htmlFor="jobFilter"
            style={{ color: "var(--label_text-color)" }}
            className="font-semibold text-xs"
          >
            Job
          </label>
          <select
            value={activeFilters.job || "None"}
            onChange={(e) => onToggle(e.target.value, "job")}
            id="jobFilter"
            style={{ color: "white" }}
            className="bg-[#00000046] text-center py-0.5 px-1 rounded text-xs"
          >
            <option>None</option>
            {allFilters.job.map((job, i) => {
              return <option key={i}>{job}</option>;
            })}
          </select>
        </div>

        <div className="flex gap-1 items-center">
          <label
            htmlFor="genderFilter"
            className="font-semibold text-xs"
            style={{ color: "var(--label_text-color)" }}
          >
            Gender
          </label>
          <select
            value={activeFilters.gender || "None"}
            onChange={(e) => onToggle(e.target.value, "gender")}
            id="genderFilter"
            style={{ color: "white" }}
            className="bg-[#00000046] text-center py-0.5 px-1 rounded text-xs"
          >
            <option>None</option>
            {allFilters.gender.map((gender, i) => {
              return <option key={i}>{gender}</option>;
            })}
          </select>
        </div>

        <div className="flex gap-1 items-center">
          <label
            htmlFor="influenceFilter"
            style={{ color: "var(--label_text-color)" }}
            className="font-semibold text-xs"
          >
            Influence
          </label>
          <select
            value={activeFilters.influence || "None"}
            onChange={(e) => onToggle(e.target.value, "influence")}
            id="influenceFilter"
            style={{ color: "white" }}
            className="bg-[#00000046] text-center py-0.5 px-1 rounded text-xs"
          >
            <option>None</option>
            {allFilters.influence.map((influence, i) => {
              return <option key={i}>{influence}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex min-w-fit ml-2">
        <p
          id="advFilters"
          onClick={handleOpenAdvFilters}
          style={{
            backgroundColor: "var(--avatar_bg-color)",
            color: "var(--label_text-color)",
          }}
          className="px-2 py-0.5 rounded text-sm"
        >
          Advanced Filters
        </p>
        {uiState.openAdvFilters && (
          <div
            id="advFilters"
            className="absolute z-5 top-0 right-0 rounded p-2 flex justify-end"
          >
            <div
              style={{
                backgroundColor: "var(--avatar_bg-color",
                borderColor: "var(--border-color",
                color: "var(--label_text-color)",
              }}
              id="advFilters"
              className="bg-[#ff0000] border-2 border-black w-full max-w-75 h-fit rounded p-2 pb-4 flex flex-col gap-2"
            >
              <div id="advFilters" className="flex justify-around">
                <div id="advFilters" className="flex-1">
                  <h2 id="advFilters" className="text-center">
                    Min Rank
                  </h2>
                  <div
                    id="advFilters"
                    className="flex gap-1 flex-wrap items-center justify-center"
                  >
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
                          id="advFilters"
                          style={{
                            color: `${
                              disabled
                                ? "var(--button_disabled-text-color)"
                                : ""
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
                <div id="advFilters" className="flex-1">
                  <h2 id="advFilters" className="text-center">
                    Max Rank
                  </h2>
                  <div
                    id="advFilters"
                    className="flex gap-1 flex-wrap items-center justify-center"
                  >
                    {allFilters.highestRank.map((max, i) => {
                      const key = `highestRank:${max}`;
                      return (
                        <Button
                          id="advFilters"
                          style={{
                            color: `${
                              disableMaxRanks
                                ? "var(--button_disabled-text-color)"
                                : ""
                            }`,
                            backgroundColor: `${
                              disableMaxRanks ? "black" : ""
                            }`,
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
              <div id="advFilters">
                <h2 id="advFilters" className="text-center">
                  Attack Types
                </h2>
                <div
                  id="advFilters"
                  className="flex gap-1 flex-wrap items-center justify-center"
                >
                  {allFilters.types.map((type, i) => {
                    const key = `types:${type}`;
                    return (
                      <Button
                        id="advFilters"
                        onClick={(e) =>
                          onToggle(e.target.innerText, allFilters.types, "type")
                        }
                        style={{}}
                        className={`${
                          enabled[key]
                            ? "custom-button-enabled"
                            : "custom-button"
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
        )}
      </div>
    </div>
  );
}
