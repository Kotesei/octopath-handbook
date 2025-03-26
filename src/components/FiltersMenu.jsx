import Button from "./Button";
import Filter from "./Filter";

export default function FiltersMenu({ filterList, triggerFilters }) {
  const { genders, influences, jobs, ranks, types } = { ...filterList };
  const minRank = ranks.slice(0, -1);
  const maxRank = ranks.slice(1);
  const array = [jobs, types, influences, minRank, maxRank, genders];

  return (
    <>
      {array.map((filter, i) => {
        return (
          <Filter
            key={i}
            filter={filter}
            multiFilter={types}
            triggerFilters={triggerFilters}
          ></Filter>
        );
      })}

      <div className="col-2 col-end-4 flex gap-15">
        <Button>Reset?</Button>
        <Button>OK</Button>
      </div>
    </>
  );
}
