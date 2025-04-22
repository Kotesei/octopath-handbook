import { useEffect, useContext } from "react";
import { TravelersContext } from "./store/travelers-context.jsx";
import "./App.css";
import TravelerList from "./components/TravelerList";
import Button from "./components/Button";
import { createPortal } from "react-dom";
import FiltersMenu from "./components/FiltersMenu";

export default function App() {
  const {
    travelers,
    loading,
    travelerFilters,
    enabled,
    openFiltersTab,
    handleSortTravelers,
    handleFilterToggle,
    handleOpenFiltersTab,
    handleCloseFiltersWindow,
    handleSelectTraveler,
    handleResetFilters,
  } = useContext(TravelersContext);

  return (
    <div className="bg-black h-full w-full flex items-center flex-col gap-5 overflow-hidden">
      <div className="flex justify-between w-full px-5 pt-5">
        <div className="flex gap-2 items-center">
          {!loading && <p className="text-white">{travelers.length}</p>}
          <p className="text-white">Favorite</p>
        </div>
        <div className="flex gap-2  items-center">
          <Button disabled={loading} clearbg onClick={handleSortTravelers}>
            Sort
          </Button>
          <Button disabled={loading} onClick={handleOpenFiltersTab}>
            Filter
          </Button>
        </div>
      </div>
      <TravelerList
        loading={loading}
        travelers={travelers ? travelers : ""}
        openTravelerDetails={handleSelectTraveler}
      />
      {openFiltersTab &&
        createPortal(
          <div className="flex flex-col overflow-auto gap-10 w-[100vw] h-[100vh] p-15 items-center bg-[#000000d0]">
            <FiltersMenu
              filterList={travelerFilters}
              enabled={enabled}
              onToggle={handleFilterToggle}
              onReset={handleResetFilters}
              onClose={handleCloseFiltersWindow}
            />
          </div>,
          document.getElementById("filtersMenu")
        )}
    </div>
  );
}
