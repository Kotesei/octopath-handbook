import "./App.css";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { TravelersContext } from "./store/travelers-context.jsx";
import Button from "./components/Button";
import Spinner from "./components/Spinner.jsx";
import Loader from "./components/Loader.jsx";
import FiltersMenu from "./components/FiltersMenu";
import MainList from "./components/MainList.jsx";
import SearchList from "./components/SearchList.jsx";

export default function App() {
  const {
    travelers,
    loading,
    error,
    openFiltersTab,
    handleSortTravelers,
    handleOpenFiltersTab,
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
      {!loading && !error && (
        <>
          <SearchList />
          {travelers.length > 0 && <MainList />}
        </>
      )}
      {travelers.length === 0 && (
        <div
          className={`flex items-center justify-center ${
            error ? "bg-red-200" : "bg-indigo-500"
          } w-[90%] min-h-[30px] overflow-auto p-5 rounded border border-white`}
        >
          <Loader error={error} loading={loading} />
        </div>
      )}

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
            <FiltersMenu />
          </div>,
          document.getElementById("filtersMenu")
        )}
    </div>
  );
}
