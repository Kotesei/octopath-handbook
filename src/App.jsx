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
// import TravelerWindow from "./components/TravelerWindow.jsx";
import { DataContext } from "./store/travelersData-context.jsx";
import { UserContext } from "./store/userData-context.jsx";
import Toast from "./components/Toast.jsx";

export default function App() {
  const {
    uiState,
    playSound,
    handleOpenFilterWindow,
    handleOpenSortWindow,
    handleOpenFavorites,
  } = useContext(UIContext);
  const { data } = useContext(DataContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="bg-indigo-950 flex-1 w-full flex items-center flex-col gap-5 overflow-auto">
        <div className="flex justify-between w-full px-5 pt-5">
          <div className="flex gap-2 items-center">
            {user?.googleId && !data.loading && !data.error && (
              <img
                className="top-0 left-[50%] border-2 border-white h-15 rounded-full text-black"
                src={user.avatar}
              />
            )}
            {user?.googleId && !data.loading && !data.error && (
              <div className="flex flex-col">
                <p className="text-xs text-black bg-indigo-200 w-fit px-2 rounded-t border-b-1">
                  {user.favorites?.length} Saved
                </p>
                <button
                  onClick={handleOpenFavorites}
                  className={`bg-white min-w-20 text-black text-[9px] sm:text-lg px-4 py-0.5 rounded rounded-tl-none`}
                >
                  {!uiState.openFavorites ? "View Favorites" : "Go Back"}
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2  items-center">
            <Button
              disabled={data.loading || data.error || uiState.openFavorites}
              clearbg
              sort
              onClick={handleOpenSortWindow}
            >
              Sort
            </Button>
            <Button
              disabled={data.loading || data.error || uiState.openFavorites}
              filter
              onClick={handleOpenFilterWindow}
            >
              Filter
            </Button>
          </div>
        </div>
        {!data.loading && !data.error && (
          <>
            <SearchList onOpen={uiState.openSearchResultsDropdown} />
            <MainList />
          </>
        )}

        {(data.loading || data.error) && (
          <div
            style={{ border: "2px solid white" }}
            className={`flex flex-1 items-center justify-center ${
              data.error ? "bg-red-200" : "bg-indigo-500"
            } w-[90%] max-h-[130px] overflow-hidden p-5 rounded`}
          >
            <Loader
              error={data.error}
              text={data.text}
              loading={data.loading}
            />
          </div>
        )}

        {data.error && (
          <h2 className="text-red-600 font-extrabold text-2xl text-center flex-1 p-3">
            Failed to fetch characters from database
          </h2>
        )}
        {data.loading && (
          <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="text-white">Loading Travelers...</h2>
            <Spinner />
          </div>
        )}

        <footer className="flex w-full min-h-[68px] mt-auto p-5 bg-indigo-900 items-center text-white relative">
          {!data.loading && (
            <h2 className="text-xl italic flex-1 text-center">
              {data.error ? "It's NOT go time..." : "It's go time.."}
            </h2>
          )}
          {!user?.googleId && !data.loading && !data.error && (
            <Button
              className="absolute bg-violet-300 px-3 rounded text-black"
              onClick={() => {
                window.location.href =
                  "https://api.octopathhandbook.com/googleauth";
              }}
            >
              Log in
            </Button>
          )}
          {user?.googleId && !data.loading && !data.error && (
            <Button
              className="absolute bg-violet-300 px-3 rounded text-black"
              onClick={() => {
                window.location.href =
                  "https://api.octopathhandbook.com/logout";
              }}
            >
              Log Out
            </Button>
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
        {uiState.toast &&
          createPortal(
            <Toast detail={uiState.toast} />,
            document.getElementById("toast")
          )}
      </div>
    </>
  );
}
