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
    <div className="bg-indigo-950 flex-1 w-full flex items-center flex-col gap-5 overflow-auto">
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
          style={{ border: "2px solid white" }}
          className={`flex flex-1 items-center justify-center ${
            uiState.error ? "bg-red-200" : "bg-indigo-500"
          } w-[90%] max-h-[130px] overflow-hidden p-5 rounded`}
        >
          <Loader
            error={uiState.error}
            text={uiState.text}
            loading={uiState.loading}
          />
        </div>
      )}

      {uiState.error && (
        <h2 className="text-red-600 font-extrabold text-2xl text-center flex-1 p-3">
          Failed to fetch characters from database
        </h2>
      )}
      {uiState.loading && (
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-white">Loading Travelers...</h2>
          <Spinner />
        </div>
      )}

      <footer className="flex w-full min-h-[68px] mt-auto p-5 bg-indigo-900 items-center text-white relative">
        {!uiState.loading && (
          <h2 className="text-xl italic flex-1 text-center">
            {uiState.error ? "It's NOT go time..." : "It's go time.."}
          </h2>
        )}
        <div className="flex flex-col items-center absolute right-0 p-3">
          <p className="text-[10px]">Made by Kotesei 👾</p>
          <a
            className="text-[9px] border rounded px-2 bg-violet-300 text-black"
            href="https://github.com/Kotesei/octopath-handbook"
          >
            Source Code
          </a>
        </div>
      </footer>

      {uiState.openFilterWindow &&
        createPortal(<FiltersMenu />, document.getElementById("filtersMenu"))}
    </div>
  );
}
