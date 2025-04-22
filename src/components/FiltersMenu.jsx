import Button from "./Button";

export default function FiltersMenu({
  filterList,
  onReset,
  onClose,
  onToggle,
  activeFilters,
}) {
  console.log(filterList);
  const {
    genders: gender,
    influences: influence,
    jobs: job,
    ranks,
    types,
  } = { ...filterList };
  const minRank = ranks.slice(0, 3);
  const maxRank = ranks.slice(1, 4);
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
        return (
          <div key={i} className="flex gap-2">
            {allFilters[filterType].map((filterName, i) => {
              const key = `${filterType}:${filterName}`;
              return (
                <Button
                  className={`h-fit px-5 hover:bg-slate-600 cursor-pointer p-2 rounded ${
                    activeFilters[key] ? "bg-slate-400" : "bg-white"
                  }`}
                  onClick={() => onToggle(filterName, allFilters[filterType])}
                  key={key}
                >
                  {filterName}
                </Button>
              );
            })}
          </div>
        );
      })}

      <div className="col-2 col-end-4 flex gap-15">
        <Button onClick={onReset}>Reset?</Button>
        <Button onClick={onClose}>OK</Button>
      </div>
    </>
  );
}
