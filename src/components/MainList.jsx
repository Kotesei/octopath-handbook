import { useContext } from "react";
import Traveler from "./Traveler";
import { TravelersContext } from "../store/travelers-context";
export default function MainList() {
  const { travelers, visibleItems } = useContext(TravelersContext);
  return (
    <div className="grid w-[90%] max-h-[70dvh] bg-indigo-500 grid-cols-1 gap-2 overflow-auto p-5 rounded border border-white">
      {travelers.map((traveler, i) => {
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
  );
}
