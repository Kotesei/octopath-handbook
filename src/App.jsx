import { useContext } from "react";
import { TravelersContext } from "./store/travelers-context.jsx";
import "./App.css";
import TravelerList from "./components/TravelerList";
import Button from "./components/Button";
import { createPortal } from "react-dom";
import FiltersMenu from "./components/FiltersMenu";
import Spinner from "./components/Spinner.jsx";

export default function App() {
  const {
    travelers,
    loading,
    loadingText,
    travelerFilters,
    enabled,
    openFiltersTab,
    handleSortTravelers,
    handleFilterToggle,
    handleOpenFiltersTab,
    handleCloseFiltersWindow,
    handleSelectTraveler,
    handleResetFilters,
    disableMaxRanks,
    error,
    icons,
    travelersList,
  } = useContext(TravelersContext);

  return (
    <div className="bg-black h-[100dvh] w-full flex items-center flex-col gap-5 overflow-hidden">
      <div className="flex justify-between w-full px-5 pt-5">
        <div className="flex gap-2 items-center">
          {!loading && <p className="text-white">{travelers.length}</p>}
          <p className="text-white">Favorite</p>
        </div>
        <div className="flex gap-2  items-center">
          <Button
            disabled={loading || error}
            clearbg
            onClick={handleSortTravelers}
          >
            Sort
          </Button>
          <Button disabled={loading || error} onClick={handleOpenFiltersTab}>
            Filter
          </Button>
        </div>
      </div>
      <TravelerList
        travelersList={travelersList}
        loading={loading}
        loadingText={loadingText}
        error={error}
        travelers={travelers ? travelers : ""}
        icons={icons}
        openTravelerDetails={handleSelectTraveler}
      />
      {error && (
        <h2 className="text-red-600 font-extrabold text-3xl text-center">
          Failed to fetch characters from database
        </h2>
      )}
      {loading && (
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-white">Loading Travelers...</h2>
          <Spinner />
        </div>
      )}
      {!loading && (
        <footer className="flex flex-col items-center flex-1 justify-end pb-9 text-white">
          <h2>{error ? "It's NOT go time..." : "It's go time.."}</h2>
          <p>Made by Kotesei 👾</p>
          <a href="#">Source Code</a>
        </footer>
      )}
      {openFiltersTab &&
        createPortal(
          <div className="flex flex-col overflow-auto gap-2 w-[100dvw] h-[100dvh] p-5 items-center bg-[#000000d0]">
            <FiltersMenu
              filterList={travelerFilters}
              enabled={enabled}
              onToggle={handleFilterToggle}
              onReset={handleResetFilters}
              onClose={handleCloseFiltersWindow}
              disabledMaxRanks={disableMaxRanks}
            />
          </div>,
          document.getElementById("filtersMenu")
        )}
    </div>
  );
}
