import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UIProvider } from "./store/travelersUI-context.jsx";
import { DataProvider } from "./store/travelersData-context.jsx";
import { FilterProvider } from "./store/travelersFilters-context.jsx";
import { SearchProvider } from "./store/travelersSearch-context.jsx";
import { UserProvider } from "./store/userData-context.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TravelerWindow from "./components/TravelerWindow.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DataProvider>
          <UIProvider>
            <FilterProvider>
              <SearchProvider>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/:travelerName" element={<TravelerWindow />} />
                </Routes>
              </SearchProvider>
            </FilterProvider>
          </UIProvider>
        </DataProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
