import { createContext, useEffect, useState } from "react";
import fetchCharacters from "../helpers/fetchCharacters.js";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({
    travelers: [],
    icons: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    async function loadTravelers() {
      let travelersData = await fetchCharacters();
      if (!travelersData) {
        setData((prev) => {
          return {
            ...prev,
            travelers: null,
            icons: null,
            error: true,
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
          };
        });
        travelersData = travelersData.travelers;

        setData((prev) => {
          return {
            ...prev,
            travelers: travelersData,
          };
        });
      }
      setData((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
    const timeoutId = setTimeout(() => {
      loadTravelers();
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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
