import { useContext } from "react";
import Traveler from "./Traveler";
import { FilterContext } from "../store/travelersFilters-context";
import { UIContext } from "../store/travelersUI-context";

export default function MainList() {
  const { visibleItems } = useContext(UIContext);
  const { travelerFilters } = useContext(FilterContext);

  return (
    <div className="relative w-[90%]">
      <div className="grid max-h-[70dvh] bg-indigo-500 grid-cols-1 gap-2 overflow-auto p-5 rounded border border-white ">
        {travelerFilters.filteredTravelers.map((traveler, i) => {
          return (
            <Traveler
              traveler={traveler}
              inView={visibleItems}
              index={i}
              key={`traveler-${i}`}
            />
          );
        })}
        <p className="absolute top-[100%] right-0 text-white">
          Found: {travelerFilters.filteredTravelers.length}
        </p>
      </div>
    </div>
  );
}
