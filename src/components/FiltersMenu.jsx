import Button from "./Button";
// #REFACTOR - UseContext
export default function FiltersMenu({
  filterList,
  onReset,
  onClose,
  onToggle,
  enabled = {},
  disabledMaxRanks,
}) {
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
    <>
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
            key={i}
            className="flex flex-col items-center border rounded-xs border-white bg-[#442dd733]"
          >
            <h2 className="text-white w-[100%] text-2xl font-bold text-center border-b-2 pb-1">
              {filterCategories[i]}
            </h2>
            <div className="flex flex-wrap gap-1 justify-center p-2">
              {allFilters[filterType].map((filterName, i) => {
                const key = `${filterType}:${filterName}`;
                const disableMaxRankFilters =
                  key.includes("highestRank") && disabledMaxRanks;

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
                      onToggle(filterName, allFilters[filterType], filterType)
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

      <div className="col-2 col-end-4 flex gap-15 pt-2">
        <Button onClick={onReset}>Reset?</Button>
        <Button onClick={onClose}>OK</Button>
      </div>
    </>
  );
}
