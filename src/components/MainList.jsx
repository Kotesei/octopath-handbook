import { useContext } from "react";
import Traveler from "./Traveler";
import { FilterContext } from "../store/travelersFilters-context";
import { UIContext } from "../store/travelersUI-context";

export default function MainList() {
  const { visibleItems } = useContext(UIContext);
  const { travelerFilters } = useContext(FilterContext);

  return (
    <>
      <div className="w-[90%] h-full min-h-[190px] flex flex-col items-center overflow-auto">
        <div className="relative w-[100%] overflow-hidden">
          <div
            style={{ border: "2px solid white" }}
            className="grid max-h-[100%] bg-indigo-500 grid-cols-1 gap-2 overflow-x-hidden overflow-y-auto overscroll-x-none p-5 rounded "
          >
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
          </div>
        </div>
        <p className="text-white self-end">
          Found: {travelerFilters.filteredTravelers.length}
        </p>
      </div>
    </>
  );
}
