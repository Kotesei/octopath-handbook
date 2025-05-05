import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UIProvider } from "./store/travelersUI-context.jsx";
import { DataProvider } from "./store/travelersData-context.jsx";
import { FilterProvider } from "./store/travelersFilters-context.jsx";
import { SearchProvider } from "./store/travelersSearch-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <UIProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </UIProvider>
    </DataProvider>
  </StrictMode>
);
