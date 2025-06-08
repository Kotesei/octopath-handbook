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
    userOptions,
    theme,
    handleOpenOptions,
    handleSelectOption,
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
          <h2 className="text-red-600 font-extrabold text-xl text-center flex-1 p-3">
            Failed to fetch characters from database
          </h2>
        )}
        {data.loading && (
          <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="text-white">Loading Travelers...</h2>
          </div>
        )}

        <footer className="theme-transition-footer flex min-w-full max-h-[68px] mt-auto p-2 items-center justify-between text-white relative gap-2">
          <>
            {user?.googleId && !data.error && !data.loading && (
              <div className="relative">
                <div className="pointer-events-none absolute border-1 w-5 h-5 left-[70%] bottom-[65%] rounded-xl flex flex-wrap overflow-hidden">
                  <div
                    style={{ backgroundColor: "var(--container_bg-color)" }}
                    className="h-[50%] w-[50%]"
                  ></div>
                  <div
                    style={{ backgroundColor: "var(--bg-color)" }}
                    className="h-[50%] w-[50%]"
                  ></div>

                  <div
                    style={{ backgroundColor: "var(--details_bg-color)" }}
                    className="h-[50%] w-[50%] "
                  ></div>
                  <div
                    style={{
                      backgroundColor: "var(--details_header_bg-color)",
                    }}
                    className="h-[50%] w-[50%] "
                  ></div>
                  {/*  */}
                </div>
                <div
                  style={{ backgroundColor: "var(--avatar_bg-color)" }}
                  className="absolute bottom-[125%] border-2 rounded-xl p-2 flex flex-col gap-1"
                >
                  {userOptions.map((option, i) => {
                    return (
                      <p
                        key={i}
                        style={{
                          backgroundColor: "var(--label_bg-color)",
                          color: "var(--label_text-color)",
                        }}
                        className="text-nowrap rounded px-2"
                        onClick={() => handleSelectOption(option)}
                      >
                        {option}
                      </p>
                    );
                  })}
                </div>

                <img
                  style={{ borderColor: "var(--border-color)" }}
                  className="border-2 min-h-12 min-w-12 max-h-12 max-w-12  rounded-full text-black"
                  src={user.avatar}
                />
              </div>
            )}
            {!user?.googleId && !data.error && !data.loading && (
              <div className="relative">
                <div className="pointer-events-none absolute border-1 w-5 h-5 left-[70%] bottom-[65%] rounded-xl flex flex-wrap overflow-hidden">
                  <div
                    style={{ backgroundColor: "var(--container_bg-color)" }}
                    className="h-[50%] w-[50%]"
                  ></div>
                  <div
                    style={{ backgroundColor: "var(--bg-color)" }}
                    className="h-[50%] w-[50%]"
                  ></div>

                  <div
                    style={{ backgroundColor: "var(--details_bg-color)" }}
                    className="h-[50%] w-[50%] "
                  ></div>
                  <div
                    style={{
                      backgroundColor: "var(--details_header_bg-color)",
                    }}
                    className="h-[50%] w-[50%] "
                  ></div>
                  {/*  */}
                </div>
                <div
                  style={{ backgroundColor: "var(--bg-color)" }}
                  className="absolute bottom-[125%] border-2 rounded-xl p-2 flex flex-col gap-1"
                >
                  {userOptions.map((option, i) => {
                    return (
                      <p
                        key={i}
                        style={{
                          backgroundColor: "var(--container_bg-color)",
                          color: "var(--label_text-color)",
                        }}
                        className="text-nowrap rounded px-2"
                        onClick={() => handleSelectOption(option)}
                      >
                        {option}
                      </p>
                    );
                  })}
                </div>
                <img
                  style={{ borderColor: "var(--border-color" }}
                  className="border-2 min-h-12 min-w-12 max-h-12 max-w-12  rounded-full text-black"
                  src={"./settings.svg"}
                  onClick={handleOpenOptions}
                />
              </div>
            )}

            {data.error && (
              <div
                style={{
                  borderColor: "var(--border-color",
                  backgroundColor: "var(--error_bg-color)",
                }}
                className="border-2 min-h-12 min-w-12 max-h-12 max-w-12rounded-full text-black flex items-center justify-center"
              >
                <p
                  style={{ color: "var(--error_text-color)" }}
                  className="text-3xl font-bold"
                >
                  !
                </p>
              </div>
            )}

            {data.loading && (
              <div
                style={{
                  borderColor: "var(--border-color",
                  backgroundColor: "var(--container_bg-color)",
                }}
                className="border-2 max-h-12 max-w-12 min-h-12 min-w-12 rounded-full text-black flex items-center justify-center"
              >
                <Spinner className="lds-roller scale-50 min-w-5" />
              </div>
            )}

            <p className="font-light text-[8px] sm:text-[11px] text-center">
              Fan project. Not affiliated with Square Enix or Acquire. All
              rights to original content belong to their respective owners.
            </p>
            {/* #REFACTOR */}
            {/* {!user?.googleId && (
                <div
                  style={{ borderColor: "var(--border-color)" }}
                  className="flex flex-wrap rounded-xl border-2 h-10 w-10 absolute right-1/2 translate-x-1/2"
                  id="theme-Selection"
                >
                  <div
                    className="absolute w-full h-full"
                    onClick={handleOpenThemeSelection}
                  ></div>
                  {uiState.openThemeSelection && <ThemeSelection />}
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
              )} */}
          </>

          {/* {user?.googleId && !data.loading && !data.error && (
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
          )} */}
          <div className="flex flex-col min-w-fit items-center gap-1 right-0 p-1">
            <p
              style={{ color: "var(--alt-text-color)" }}
              className="text-[10px]"
            >
              By Kotesei 👾
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
