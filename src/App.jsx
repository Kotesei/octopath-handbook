import "./App.css";
import TravelerList from "./components/TravelerList";
import { travelers } from "./helpers/FilterCharacters";

export default function App() {
  console.log(travelers);
  travelers.filterByType("Dark");
  travelers.filterByType("Swords");
  console.log(travelers.filteredTravelers);
  return (
    <div className="bg-black h-full w-full flex overflow-hidden">
      <TravelerList travelers={travelers.unsortedTravelers} />
    </div>
  );
}
