import Button from "./Button";

export default function Filter({ triggerFilters, filter }) {
  return (
    <div className="flex gap-2  flex-wrap">
      {filter.map((value, i) => {
        return (
          <Button onClick={() => triggerFilters(value)} key={i}>
            {value}
          </Button>
        );
      })}
    </div>
  );
}
