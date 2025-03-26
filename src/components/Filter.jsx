import { useState } from "react";
import Button from "./Button";
export default function Filter({ filter, multiFilter, triggerFilters }) {
  const [active, setActive] = useState({});

  function toggleActiveState(value, filter) {
    console.log(value, filter);
    let min = false;
    let max = false;
    if (filter[0] === "★★★") min = true;
    if (filter[0] === "★★★★") max = true;
    if (multiFilter?.includes(value)) {
      setActive((prev) => ({
        ...prev,
        [value]: !prev[value],
      }));
    } else {
      setActive((prev) => ({
        [value]: !prev[value],
      }));
    }
    triggerFilters(value, min, max);
  }

  return (
    <div className="flex gap-2 ">
      {filter.map((value, i) => {
        return (
          <Button
            className={`h-fit px-5 hover:bg-slate-600 cursor-pointer p-2 rounded ${
              active[value] ? "bg-slate-400" : "bg-white"
            }`}
            onClick={() => toggleActiveState(value, filter)}
            key={i}
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
}
