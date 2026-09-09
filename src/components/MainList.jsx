import { useContext, useState } from "react";
import Traveler from "./Traveler";
import { FilterContext } from "../store/travelersFilters-context";
import { UIContext } from "../store/travelersUI-context";
import { UserContext } from "../store/userData-context";
import { DataContext } from "../store/travelersData-context";
import FiltersMenu from "./FiltersMenu";

export default function MainList() {
  const { visibleItems, uiState, bodyHeight } = useContext(UIContext);
  const rotate = 430 > bodyHeight;
  const { travelerFilters, travelerListRef } = useContext(FilterContext);
  const { user } = useContext(UserContext);
  const { data } = useContext(DataContext);
  const filtersReady =
    !data.loading &&
    data.travelers.length > 0 &&
    travelerFilters.unfilteredTravelers.length > 0;

  const noTravelers =
    (user.favorites?.length === 0 && uiState.openFavorites) ||
    (travelerFilters.filteredTravelers.length === 0 && !uiState.openFavorites);

  if (filtersReady) {
    return (
      <>
        <div
          className={`overflow-hidden relative pointer-events-none ${
            rotate
              ? `w-[100%] max-h-[95%]
                 min-h-[95%]
                 pl-20 pr-2`
              : `w-[90%] h-full min-h-[162px]`
          } flex flex-col items-center`}
        >
          <div
            className={`pointer-events-auto relative w-full
            flex h-full flex-col overflow-hidden rounded`}
            style={{
              backgroundColor: "var(--container_bg-color)",
              border: "2px solid var(--border-color)",
            }}
          >
            {uiState.openFilterWindow && <FiltersMenu />}
            <div
              ref={travelerListRef}
              id={"travelerList"}
              className={`${
                noTravelers
                  ? "flex items-center justify-center flex-1"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1.5"
              } max-h-[100%] overflow-x-hidden overflow-y-auto 
             
custom-scrollbar
overscroll-x-none p-2`}
            >
              {noTravelers && (
                <p>No Travelers {uiState.openFavorites ? "Saved" : "Found"}!</p>
              )}
              {uiState.openFavorites && (
                <>
                  {user.favorites.map((travelerId, i) => {
                    const traveler = data.travelers.find(
                      (traveler) => traveler._id === travelerId
                    );
                    return (
                      <Traveler
                        traveler={traveler}
                        inView={visibleItems}
                        index={i}
                        key={`traveler-${i}`}
                      />
                    );
                  })}
                </>
              )}
              {!uiState.openFavorites && data.travelers.length > 0 && (
                <>
                  {travelerFilters.filteredTravelers.map((traveler, i) => {
                    return (
                      <Traveler
                        traveler={traveler}
                        inView={visibleItems}
                        index={i}
                        key={`traveler-${i}`}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          {!noTravelers && uiState.openFavorites && (
            <p
              style={{ color: "var(--text-color--2)" }}
              className={`self-end ${
                430 > document.body.getBoundingClientRect().height
                  ? "absolute left-0 bottom-0 text-xs pl-4"
                  : ""
              }`}
            >
              Saved: {user.favorites.length}
            </p>
          )}

          {!uiState.openFavorites && uiState.travelerCount > 0 && (
            <p
              style={{ color: "var(--text-color--2)" }}
              className={`self-end ${
                430 > document.body.getBoundingClientRect().height
                  ? "absolute left-0 bottom-0 text-xs pl-2"
                  : ""
              }`}
            >
              Found: {uiState.travelerCount}
            </p>
          )}
        </div>
      </>
    );
  }
}
