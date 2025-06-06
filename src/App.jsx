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
import { DataContext } from "./store/travelersData-context.jsx";
import { UserContext } from "./store/userData-context.jsx";
import Toast from "./components/Toast.jsx";
import ThemeSelection from "./components/ThemeSelection.jsx";

export default function App() {
  const {
    uiState,
    theme,
    handleOpenFilterWindow,
    handleOpenSortDropdown,
    handleOpenFavorites,
    handleCloseFilterWindow,
  } = useContext(UIContext);
  const { data } = useContext(DataContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <div
        className={`${theme} theme-transition-bg flex-1 w-full flex items-center flex-col gap-5 overflow-auto`}
      >
        <div className="flex justify-between w-full px-5 pt-5">
          <div className="flex gap-2 items-center">
            {user?.googleId && !data.loading && !data.error && (
              <div className="flex flex-col">
                <p
                  style={{
                    backgroundColor: "var(--label_bg-color)",
                    color: "var(--alt-text-color)",
                    borderColor: "var(--border-color)",
                  }}
                  className="text-x w-fit px-2 rounded-t border-b-1"
                >
                  {user.favorites?.length} Saved
                </p>
                <Button
                  onClick={handleOpenFavorites}
                  className={`bg-white min-w-20 text-black text-[9px] sm:text-lg px-4 py-0.5 rounded rounded-tl-none`}
                >
                  {!uiState.openFavorites ? "View Favorites" : "Go Back"}
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-2  items-center">
            <Button
              disabled={data.loading || data.error || uiState.openFavorites}
              clearbg
              sort
              openSortDropdown={uiState.openSortDropdown}
              onClick={handleOpenSortDropdown}
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
            style={{
              border: "2px solid white",
              backgroundColor: `${
                data.error
                  ? "var(--error_bg-color)"
                  : "var(--container_bg-color)"
              }`,
            }}
            className={`flex flex-1 items-center justify-center w-[90%] max-h-[130px] overflow-hidden p-5 rounded`}
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

        <footer className="theme-transition-footer flex w-full min-h-[68px] mt-auto p-5 items-center text-white relative">
          {/* // #REFACTOR */}
          {!data.loading && (
            // <h2 className="text-xl italic flex-1 text-center">
            //   {data.error ? "It's NOT go time..." : "It's go time.."}
            // </h2>
            // Theme here
            <>
              {user?.googleId && !data.loading && !data.error && (
                <img
                  style={{ borderColor: "var(--border-color)" }}
                  className="right-1/2 translate-x-1/2 absolute border-2 h-12 rounded-full text-black"
                  src={user.avatar}
                />
              )}
              {!user?.googleId && (
                <div
                  style={{ borderColor: "var(--border-color)" }}
                  className="flex flex-wrap rounded-xl border-2 h-10 w-10 absolute right-1/2 translate-x-1/2"
                >
                  <ThemeSelection />
                  <div
                    style={{ backgroundColor: "var(--container_bg-color)" }}
                    className="h-[50%] w-[50%] rounded-tl-[10px]"
                  ></div>
                  <div
                    style={{ backgroundColor: "var(--bg-color)" }}
                    className="h-[50%] w-[50%] rounded-tr-[10px]"
                  ></div>

                  <div
                    style={{ backgroundColor: "var(--details_bg-color)" }}
                    className="h-[50%] w-[50%] rounded-bl-[10px]"
                  ></div>
                  <div
                    style={{
                      backgroundColor: "var(--details_header_bg-color)",
                    }}
                    className="h-[50%] w-[50%] rounded-br-[10px]"
                  ></div>
                </div>
              )}
            </>
          )}
          {!user?.googleId && !data.loading && !data.error && (
            <Button
              style={{
                backgroundColor: "var(--label_bg-color)",
                color: "var(--alt-text-color)",
              }}
              className="absolute px-3 rounded"
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
              style={{
                backgroundColor: "var(--label_bg-color)",
                color: "var(--alt-text-color)",
              }}
              className="absolute px-3 rounded"
              onClick={() => {
                window.location.href =
                  "https://api.octopathhandbook.com/logout";
              }}
            >
              Log Out
            </Button>
          )}
          <div className="flex flex-col items-center absolute right-0 p-3">
            <p
              style={{ color: "var(--alt-text-color)" }}
              className="text-[10px]"
            >
              Made by Kotesei 👾
            </p>
            <a
              style={{
                backgroundColor: "var(--label_bg-color)",
                color: "var(--alt-text-color)",
              }}
              className="text-[9px] border rounded px-2"
              href="https://github.com/Kotesei/octopath-handbook"
            >
              Source Code
            </a>
          </div>
        </footer>

        {uiState.openFilterWindow &&
          createPortal(
            <FiltersMenu theme={theme} onClose={handleCloseFilterWindow} />,
            document.getElementById("filtersMenu")
          )}
        {uiState.toast &&
          createPortal(
            <Toast detail={uiState.toast} />,
            document.getElementById("toast")
          )}
      </div>
    </>
  );
}
