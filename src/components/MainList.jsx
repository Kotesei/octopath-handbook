import { useContext, useState } from "react";
import Traveler from "./Traveler";
import { FilterContext } from "../store/travelersFilters-context";
import { UIContext } from "../store/travelersUI-context";
import { UserContext } from "../store/userData-context";
import { DataContext } from "../store/travelersData-context";

export default function MainList() {
  const { visibleItems, uiState } = useContext(UIContext);
  const { travelerFilters, travelerListRef } = useContext(FilterContext);
  const { user } = useContext(UserContext);
  const { data } = useContext(DataContext);
  const filtersReady =
    !data.loading &&
    data.travelers.length > 0 &&
    travelerFilters.unfilteredTravelers.length > 0;

  const noTravelers =
    (user.favorites?.length === 0 && uiState.openFavorites) ||
    travelerFilters.filteredTravelers.length === 0;

  if (filtersReady) {
    return (
      <>
        <div className="w-[90%] h-full min-h-[162px] flex flex-col items-center">
          <div className="relative w-[100%] overflow-hidden">
            <div
              ref={travelerListRef}
              style={{
                border: "2px solid var(--border-color)",
                backgroundColor: "var(--container_bg-color)",
              }}
              id={"travelerList"}
              className={`${
                noTravelers
                  ? "flex items-center justify-center"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1.5"
              } max-h-[100%] overflow-x-hidden overflow-y-auto 
             
custom-scrollbar
overscroll-x-none p-2 rounded`}
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
          {uiState.openFavorites && user.favorites.length > 0 && (
            <p style={{ color: "var(--text-color)" }} className="self-end">
              Favorited: {user.favorites.length}
            </p>
          )}

          {!uiState.openFavorites && uiState.travelerCount > 0 && (
            <p style={{ color: "var(--text-color--2)" }} className="self-end">
              Found: {uiState.travelerCount}
            </p>
          )}
        </div>
      </>
    );
  }
}
