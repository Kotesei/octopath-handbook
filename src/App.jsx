import "./App.css";
import { createPortal } from "react-dom";
import Button from "./components/Button";
import Spinner from "./components/Spinner.jsx";
import Loader from "./components/Loader.jsx";
import MainList from "./components/MainList.jsx";
import SearchList from "./components/SearchList.jsx";
import { UIContext } from "./store/travelersUI-context.jsx";
import { useContext, useRef } from "react";
import { DataContext } from "./store/travelersData-context.jsx";
import { UserContext } from "./store/userData-context.jsx";
import Toast from "./components/Toast.jsx";
import ThemeSelection from "./components/ThemeSelection.jsx";
import { FAQ } from "./components/FAQ.jsx";

export default function App() {
  const {
    uiState,
    bodyHeight,
    userOptions,
    theme,
    popoutType,
    handleToggleSearchBar,
    handleOpenOptions,
    handleSelectOption,
    handleOpenFilterWindow,
    handleOpenSortDropdown,
    handleFAQDropdown,
    handleOpenFavorites,
    handleCloseWindow,
  } = useContext(UIContext);
  const { data } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const rotate = 430 > bodyHeight;
  return (
    <>
      <div
        className={`${theme}  ${
          rotate ? "justify-center" : ""
        } theme-transition-bg flex-1 w-full flex items-center flex-col gap-5 overflow-auto`}
      >
        {rotate && !data.loading && !data.error && (
          <div className="w-20 h-full absolute left-0 top-0 px-3 py-8 flex flex-col justify-between items-center">
            <div className="flex flex-col gap-3.5 items-center">
              <div
                className="bg-white w-8.5 h-8.5 rounded-full flex items-center justify-center"
                onClick={handleToggleSearchBar}
              >
                <img src="search.svg" className="size-7" />
              </div>
              <div className="bg-black w-13 h-13 rounded-full"></div>
              <div className="bg-black w-13 h-13 rounded-full"></div>
            </div>
            <div
              id="options-window"
              className="relative"
              onClick={handleOpenOptions}
            >
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
              {uiState.openOptions && (
                <div
                  id="options-window"
                  style={{ backgroundColor: "var(--avatar_bg-color)" }}
                  className={`absolute bottom-[125%] border-2 rounded-xl min-w-fit z-20 ${
                    uiState.openThemeSelection ? "p-1" : "p-2"
                  } flex flex-col gap-1`}
                >
                  {uiState.openThemeSelection && <ThemeSelection />}
                  {!uiState.openThemeSelection &&
                    userOptions.map((option, i) => {
                      return (
                        <p
                          key={i}
                          id="options-window"
                          style={{
                            whiteSpace: "nowrap",
                            textWrap: "nowrap",
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
              )}
              <img
                style={{ borderColor: "var(--border-color" }}
                className="border-2 min-h-13 min-w-13 max-h-13 max-w-13 rounded-full text-black pointer-events-none"
                src={"./settings.svg"}
              />
            </div>
          </div>
        )}
        {!rotate && (
          <div
            className={`flex justify-between w-full px-5 pt-5 ${
              rotate ? "absolute z-1" : ""
            }`}
          >
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
        )}
        {!data.loading && !data.error && (
          <>
            <SearchList
              showSearchBar={uiState.showSearchBar}
              onOpen={uiState.openSearchResultsDropdown}
              bodyHeight={bodyHeight}
            />
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
          <h2
            style={{ color: "var(--text-color--2)" }}
            className="font-extrabold text-xl text-center flex-1 p-3"
          >
            Failed to fetch characters from database
          </h2>
        )}
        {data.loading && (
          <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="text-white">Loading Travelers...</h2>
          </div>
        )}

        <footer
          style={{ position: rotate ? "absolute" : "" }}
          className={`theme-transition-footer flex min-w-full max-h-[68px] mt-auto p-2 items-center justify-between text-white relative gap-2 ${
            rotate ? "invisible" : ""
          }`}
        >
          <>
            {user?.googleId && !data.error && !data.loading && (
              <div
                id="options-window"
                className="relative"
                onClick={handleOpenOptions}
              >
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
                {uiState.openOptions && (
                  <div
                    id="options-window"
                    style={{ backgroundColor: "var(--avatar_bg-color)" }}
                    className={`absolute bottom-[125%] border-2 rounded-xl min-w-fit ${
                      uiState.openThemeSelection ? "p-1" : "p-2"
                    } flex flex-col gap-1`}
                  >
                    {uiState.openThemeSelection && <ThemeSelection />}
                    {!uiState.openThemeSelection &&
                      userOptions.map((option, i) => {
                        return (
                          <p
                            key={i}
                            id="options-window"
                            style={{
                              whiteSpace: "nowrap",
                              textWrap: "nowrap",
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
                )}
                <img
                  style={{ borderColor: "var(--border-color" }}
                  className="border-2 min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-black pointer-events-none"
                  src={user.avatar}
                />
              </div>
            )}
            {!user?.googleId && !data.error && !data.loading && (
              <div
                id="options-window"
                className="relative"
                onClick={handleOpenOptions}
              >
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
                {uiState.openOptions && (
                  <div
                    id="options-window"
                    style={{ backgroundColor: "var(--avatar_bg-color)" }}
                    className={`absolute bottom-[125%] border-2 rounded-xl min-w-fit ${
                      uiState.openThemeSelection ? "p-1" : "p-2"
                    } flex flex-col gap-1`}
                  >
                    {uiState.openThemeSelection && <ThemeSelection />}
                    {!uiState.openThemeSelection &&
                      userOptions.map((option, i) => {
                        return (
                          <p
                            key={i}
                            id="options-window"
                            style={{
                              whiteSpace: "nowrap",
                              textWrap: "nowrap",
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
                )}
                <img
                  style={{ borderColor: "var(--border-color" }}
                  className="border-2 min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-black pointer-events-none"
                  src={"./settings.svg"}
                />
              </div>
            )}

            {data.error && (
              <div
                style={{
                  borderColor: "var(--border-color",
                  backgroundColor: "var(--error_bg-color)",
                }}
                className="border-2 min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-black flex items-center justify-center"
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
          </>

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
      </div>
      {uiState.toast &&
        createPortal(
          <Toast detail={uiState.toast} />,
          document.getElementById("toast")
        )}
      {uiState.openPopup &&
        createPortal(
          <div
            className={`${theme} absolute z-50 w-full h-full flex items-center justify-center bg-[#000000c7]`}
          >
            <div
              onClick={handleCloseWindow}
              className="absolute z-1 w-full h-full backdrop-blur-[2px]"
            ></div>
            <div
              style={{ border: "solid 2px var(--border-color)" }}
              className="relative z-2 backdrop-blur-[3px] bg-[#00000063] w-[80%] h-fit max-h-[70%] rounded-lg flex flex-col items-center border overflow-auto"
            >
              <h2 className="text-white w-full text-center p-3 font-bold text-4xl italic">
                {popoutType}
              </h2>
              {popoutType === "Help" && (
                <div className="h-full w-full flex flex-col gap-2 p-5">
                  <div className="flex bg-[#000000c7] rounded-xl w-full h-fit p-3 flex-col">
                    <div
                      className="flex flex-1 justify-between p-2"
                      onClick={handleFAQDropdown}
                    >
                      <h2 className="text-white ">FAQ</h2>
                      <img
                        src="dropdown-arrow.svg"
                        className={`w-5 ${
                          uiState.openFAQDropdown ? "-rotate-90" : ""
                        } invert`}
                      />
                    </div>
                    {uiState.openFAQDropdown && (
                      <div className="flex flex-col gap-2 pt-2">
                        <FAQ />
                        <FAQ />
                        <FAQ />
                      </div>
                    )}
                  </div>
                  <h2 className="text-white w-full h-fit p-1 px-3 rounded-xl bg-[#000000c7]">
                    Quick Start Guide
                  </h2>
                  <h2 className="text-white w-full h-fit p-1 px-3 rounded-xl bg-[#000000c7]">
                    Changelog
                  </h2>
                  <h2 className="text-white w-full h-fit p-1 px-3 rounded-xl bg-[#000000c7]">
                    More Information
                  </h2>
                  <h2 className="text-white w-full h-fit p-1 px-3 rounded-xl bg-[#000000c7]">
                    Contact Support
                  </h2>
                </div>
              )}
            </div>
          </div>,
          document.getElementById("popout-container")
        )}
    </>
  );
}
