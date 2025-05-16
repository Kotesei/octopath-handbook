import { createContext, useEffect, useState, useContext } from "react";
import fetchCharacters from "../helpers/fetchCharacters.js";
import fetchCharacter from "../helpers/fetchCharacter.js";
import sheepQuotes from "../../randomSheepQuote.js";
import { UserContext } from "./userData-context.jsx";
import { useLocation } from "react-router-dom";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const location = useLocation();
  const { user } = useContext(UserContext);

  const [data, setData] = useState({
    travelers: [],
    selectedTraveler: null,
    icons: [],
    loading: true,
    error: false,
    text: sheepQuotes[Math.floor(Math.random() * sheepQuotes.length)],
  });

  useEffect(() => {
    async function loadTraveler() {
      let travelerData = await fetchCharacter(
        location.pathname.split("/")[1],
        data
      );
      if (!travelerData) {
        setData((prev) => {
          return {
            ...prev,
            loading: false,
            error: true,
          };
        });
      } else {
        setData((prev) => {
          return {
            ...prev,

            selectedTraveler: travelerData,
            loading: false,
          };
        });
      }
    }

    async function loadTravelers() {
      let travelersData = await fetchCharacters();
      if (!travelersData) {
        setData((prev) => {
          return {
            ...prev,
            travelers: null,
            icons: null,
            error: true,
            loading: false,
            text: "The shepherd’s voice is lost, and the herd, without guidance, wanders in silence. The records are corrupted; the path is unclear...",
          };
        });
      } else {
        setData((prev) => {
          return {
            ...prev,
            icons: {
              genders: travelersData.genders,
              types: travelersData.types,
            },
            travelers: travelersData.travelers,
            loading: false,
          };
        });
      }
    }

    if (data.travelers?.length === 0 && location.pathname === "/") {
      // Timer for testing purposes
      let timer = 0;
      setData((prev) => {
        return {
          ...prev,
          loading: true,
          error: false,
        };
      });
      const timeoutId = setTimeout(() => {
        loadTravelers();
      }, timer);

      return () => {
        clearTimeout(timeoutId);
      };
    } else if (location.pathname !== "/" && !data.selectedTraveler) {
      setData((prev) => {
        return {
          ...prev,
          loading: true,
          error: false,
        };
      });
      loadTraveler();
    }
    if (data.selectedTraveler) {
      document.title = `${data.selectedTraveler.name} | Octopath Handbook`;
    }
  }, [data.travelers, data.selectedTraveler, location]);

  useEffect(() => {
    if (location.pathname === "/") {
      setData((prev) => {
        return { ...prev, selectedTraveler: null };
      });
    }
  }, [location]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
