import { createContext, useEffect, useState } from "react";
import syncUser from "../helpers/syncUser";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserData] = useState({});

  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await syncUser();
        if (userData.failed)
          throw new Error(`Failed to fetch user data are you logged in?`);
        setUserData(userData.user);
      } catch (error) {
        // console.error("Error loading user data:", error);
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const loggedIn = urlParams.get("loggedIn");
    const loggedOut = urlParams.get("loggedOut");

    if (loggedIn === "true") {
      setUserData((prev) => {
        return { ...prev, loggedIn: true };
      });
    } else if (loggedIn === "false") {
      setUserData((prev) => {
        return { ...prev, loggedInFailed: true };
      });
    }
    if (loggedOut === "true") {
      setUserData((prev) => {
        return { ...prev, loggedOut: true };
      });
    }

    loadUserData();
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
