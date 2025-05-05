import { createContext } from "react";

export const SortContext = createContext();

export function SortProvider({ children }) {
  function handleSortTravelers() {
    if (loading || error) return;
  }
  return <SortContext.Provider>{children}</SortContext.Provider>;
}
