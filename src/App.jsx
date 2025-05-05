import "./App.css";
import { createPortal } from "react-dom";
import Button from "./components/Button";
import Spinner from "./components/Spinner.jsx";
import Loader from "./components/Loader.jsx";
import FiltersMenu from "./components/FiltersMenu";
import MainList from "./components/MainList.jsx";
import SearchList from "./components/SearchList.jsx";
import { UIContext } from "./store/travelersUI-context.jsx";
import { useContext } from "react";
import { SearchProvider } from "./store/travelersSearch-context.jsx";

export default function App() {
  const { uiState, handleOpenFilterWindow, handleOpenSortWindow } =
    useContext(UIContext);

  return (
    <div className="bg-black h-[100dvh] w-full flex items-center flex-col gap-5 overflow-hidden">
      <div className="flex justify-between w-full px-5 pt-5">
        <div className="flex gap-2 items-center">
          {!uiState.loading && !uiState.error && (
            <p className="text-white">0</p>
          )}
          <p className="text-white">Favorite</p>
        </div>
        <div className="flex gap-2  items-center">
          <Button
            disabled={uiState.loading || uiState.error}
            clearbg
            sort
            onClick={handleOpenSortWindow}
          >
            Sort
          </Button>
          <Button
            disabled={uiState.loading || uiState.error}
            filter
            onClick={handleOpenFilterWindow}
          >
            Filter
          </Button>
        </div>
      </div>
      {!uiState.loading && !uiState.error && (
        <>
          <SearchProvider>
            <SearchList onOpen={uiState.openSearchResultsDropdown} />
          </SearchProvider>
          {uiState.travelerCount > 0 && <MainList />}
        </>
      )}
      {uiState.travelerCount === 0 && (
        <div
          className={`flex items-center justify-center ${
            uiState.error ? "bg-red-200" : "bg-indigo-500"
          } w-[90%] min-h-[30px] overflow-auto p-5 rounded border border-white`}
        >
          <Loader
            error={uiState.error}
            text={uiState.text}
            loading={uiState.loading}
          />
        </div>
      )}

      {uiState.error && (
        <h2 className="text-red-600 font-extrabold text-3xl text-center">
          Failed to fetch characters from database
        </h2>
      )}
      {uiState.loading && (
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-white">Loading Travelers...</h2>
          <Spinner />
        </div>
      )}
      {!uiState.loading && (
        <footer className="flex flex-col items-center flex-1 justify-end pb-9 text-white">
          <h2>{uiState.error ? "It's NOT go time..." : "It's go time.."}</h2>
          <p>Made by Kotesei 👾</p>
          <a href="#">Source Code</a>
        </footer>
      )}

      {uiState.openFilterWindow &&
        createPortal(
          <div className="flex flex-col overflow-auto gap-2 w-[100dvw] h-[100dvh] p-5 items-center bg-[#000000d0]">
            <FiltersMenu />
          </div>,
          document.getElementById("filtersMenu")
        )}
    </div>
  );
}
