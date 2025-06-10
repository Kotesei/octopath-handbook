import { createContext, useContext, useEffect } from "react";
import { UIContext } from "./travelersUI-context";

export const SortContext = createContext();

export function SortProvider({ children }) {
  const { uiState, handleClickOutside } = useContext(UIContext);
  function handleSortTravelers() {
    if (loading || error) return;
  }

  useEffect(() => {
    let handle = (e) =>
      handleClickOutside(e, "sortContainer", "openSortDropdown");
    if (uiState.openSortDropdown) {
      window.addEventListener("click", handle);
    }
    return () => {
      window.removeEventListener("click", handle);
    };
  }, [uiState.openSortDropdown]);
  return <SortContext.Provider value={{}}>{children}</SortContext.Provider>;
}
