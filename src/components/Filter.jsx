import { useState } from "react";
import Button from "./Button";

export default function Filter({
  triggerFilters,
  filter,
  types,
  minRank,
  maxRank,
}) {
  const [isActive, setIsActive] = useState({});
  function handleClick(value) {
    triggerFilters(value, minRank, maxRank);
    console.log(value);
    console.log(types);
    if (types?.includes(value)) {
      setIsActive((prev) => ({
        ...prev,
        [value]: !prev[value],
      }));
    } else {
      setIsActive((prev) => ({
        [value]: !prev[value],
      }));
    }
  }

  return (
    <div className="flex gap-2  flex-wrap">
      {filter.map((value, i) => {
        return (
          <Button
            onClick={() => handleClick(value)}
            active={isActive[value] ? true : false}
            key={i}
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
}
