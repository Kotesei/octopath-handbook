import { createContext, useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "./travelersData-context";
import favoriteCharacter from "../helpers/favoriteCharacter";
import { UserContext } from "./userData-context";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";

export const UIContext = createContext();

export function UIProvider({ children }) {
  const sounds = useRef({});

  const tapTimeoutRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("toasty-theme");
  const [enableAudio, setEnableAudio] = useState(false);
  const { data, setData } = useContext(DataContext);
  const { setUserData } = useContext(UserContext);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const { user } = useContext(UserContext);
  const [userOptions, setUserOptions] = useState("");
  const [uiState, setUiState] = useState({
    openSortDropdown: false,
    openFavorites: false,
    openFilterWindow: false,
    openThemeSelection: false,
    openSearchResultsDropdown: false,
    openOptions: false,
    travelerCount: 0,
    toast: null,
  });

  useEffect(() => {
    if (!data.loading && !data.selectedTraveler) {
      if (
        (user.favorites?.length === 0 && uiState.openFavorites) ||
        uiState.travelerCount === 0
      ) {
        playSound("no_travelers");
      }
    }
  }, [user.favorites, uiState.openFavorites, uiState.travelerCount]);

  function handleOpenThemeSelection() {
    setUiState((prev) => {
      return { ...prev, openThemeSelection: true };
    });
  }

  function handleSwitchTheme(theme) {
    localStorage.setItem("theme", theme);
    setTheme(`${theme}-theme`);
    setUiState((prev) => {
      return { ...prev, openThemeSelection: false };
    });
  }

  useEffect(() => {
    const handle = (e) =>
      handleClickOutside(e, "options-window", "openOptions");
    if (uiState.openOptions) {
      window.addEventListener("click", handle);
    }
    return () => {
      window.removeEventListener("click", handle);
    };
  }, [uiState.openOptions]);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(`${localStorage.getItem("theme")}-theme`);
    }
  }, []);

  function handleOpenOptions(e) {
    if (uiState.openOptions) {
      if (e.target.id === "options-window") return;

      setUiState((prev) => {
        return { ...prev, openOptions: false, openThemeSelection: false };
      });
    } else {
      setUiState((prev) => {
        return { ...prev, openOptions: true };
      });
    }
  }

  function handleSelectOption(option) {
    switch (option) {
      case "Login":
        window.location.href = "https://api.octopathhandbook.com/googleauth";
        break;
      case "Logout":
        window.location.href = "https://api.octopathhandbook.com/logout";
        break;
      case "Manage Account":
        console.log("Manage Account Stuff Here");
        break;
      case "Change Theme":
        console.log("Theme Stuff Here");
        handleOpenThemeSelection();
        break;
      case "Help":
        console.log("Help Stuff Here");
    }
  }

  function handleSelectTraveler(traveler) {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
      handleFavoriteTraveler(traveler);
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        playSound("page_turn");

        navigate(`/${traveler.slug}`);

        setData((prev) => ({
          ...prev,
          selectedTraveler: traveler,
        }));

        setUiState((prev) => ({
          ...prev,
          openSearchResultsDropdown: false,
        }));

        tapTimeoutRef.current = null;
      }, 300);
    }
  }

  function handleOpenFavorites() {
    if (!uiState.openFavorites) {
      playSound("confirm");
      setUiState((prev) => {
        return {
          ...prev,
          openFavorites: true,
          travelerCount: user.favorites.length,
        };
      });
    } else {
      playSound("back");
      setUiState((prev) => {
        return {
          ...prev,
          openFavorites: false,
          travelerCount: data.travelers.length,
        };
      });
    }
  }

  useEffect(() => {
    document.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });

    document.addEventListener("drop", function (e) {
      e.preventDefault();
    });
  }, []);

  async function handleFavoriteTraveler({ _id: id, name }) {
    let alreadyFavorited;
    setUserData((prev) => {
      if (!prev) return prev;

      alreadyFavorited = prev.favorites?.includes(id);

      const updatedFavorites = alreadyFavorited
        ? prev.favorites.filter((favId) => favId !== id)
        : [...(prev.favorites || []), id];

      return {
        ...prev,
        favorites: updatedFavorites,
      };
    });
    const result = await favoriteCharacter(id);

    if (result.success) {
      let toast;
      if (alreadyFavorited) {
        playSound("unfavorite");
        toast = {
          type: "Favorite",
          details: {
            name,
            message: "Successfully removed traveler from favorites!",
          },
        };
      } else {
        playSound("favorite");
        toast = {
          type: "Favorite",
          details: {
            name,
            message: "Successfully saved traveler to favorites!",
          },
        };
      }
      setUiState((prev) => {
        return { ...prev, toast };
      });
    }
    if (result.failed) {
      toast = {
        type: "Error",
        details: {
          message: "Failed to save traveler to favorites...",
        },
      };

      setUiState((prev) => {
        return { ...prev, toast };
      });
    }
  }

  useEffect(() => {
    if (user.googleId) {
      setUserOptions(["Help", "Change Theme", "Manage Account", "Logout"]);
    }
    if (!user.googleId) {
      setUserOptions(["Help", "Change Theme", "Login"]);
    }
    if (user.loggedIn) {
      setUiState((prev) => {
        return { ...prev, loggedIn: true };
      });
    }

    if (user.loggedInFailed) {
      setUiState((prev) => {
        return { ...prev, loggedInFailed: true };
      });
    }
    if (user.loggedOut) {
      setUiState((prev) => {
        return { ...prev, loggedOut: true };
      });
    }
  }, [user]);

  useEffect(() => {
    if (uiState.toast) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setUiState((prev) => ({ ...prev, toast: null }));
        timerRef.current = null;
      }, 4000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [uiState.toast]);

  useEffect(() => {
    if (data.selectedTraveler) {
      setUiState((prev) => {
        return {
          ...prev,
          openSearchResultsDropdown: false,
        };
      });
    }
  }, [data.selectedTraveler]);

  function createIntersectionHandler(intersection) {
    return function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersection((prev) => new Set(prev).add(entry.target.id));
        } else {
          intersection((prev) => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      });
    };
  }
  function observeElements(handleIntersection, element, location) {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
    });

    element.forEach((traveler, index) => {
      const cardElement = document.getElementById(`${location}-${index}`);
      if (cardElement) {
        observer.observe(cardElement);
      }
    });
    return () => {
      observer.disconnect();
    };
  }

  function handleOpenSortDropdown(e) {
    if (data.loading || data.error || uiState.openFavorites) {
      playSound("deny");
      return;
    }
    if (!uiState.openSortDropdown) {
      playSound("confirm");
    }

    if (
      e.target === document.getElementById("sortContainer") &&
      uiState.openSortDropdown
    ) {
      playSound("back");
      setUiState((prev) => {
        return {
          ...prev,
          openSortDropdown: false,
        };
      });
    }

    if (e.target.closest("#sort-toggle")) {
      playSound("confirm");
      setUiState((prev) => {
        return {
          ...prev,
          openSortDropdown: false,
        };
      });
    } else if (!uiState.openSortDropdown) {
      setUiState((prev) => {
        return {
          ...prev,
          openSortDropdown: true,
        };
      });
    }
  }

  function handleCloseSortDropdown() {
    playSound("toggle");
    setUiState((prev) => {
      return { ...prev, openSortDropdown: false };
    });
  }

  function handleOpenFilterWindow() {
    if (data.loading || data.error || uiState.openFavorites) {
      playSound("deny");
      return;
    }
    playSound("confirm");
    setUiState((prev) => {
      return {
        ...prev,
        openFilterWindow: true,
      };
    });
  }

  function handleCloseFilterWindow() {
    playSound("confirm");
    setUiState((prev) => {
      return {
        ...prev,
        openFilterWindow: false,
      };
    });
  }

  function playSound(name) {
    const sound = sounds.current[name];
    if (sound) {
      sound.play();
    }
  }

  useEffect(() => {
    const handleUserInteraction = () => {
      setEnableAudio(true);
    };

    if (enableAudio) {
      sounds.current = {
        back: new Howl({ src: ["/sounds/back.wav"], preload: true }),
        confirm: new Howl({ src: ["/sounds/confirm.wav"], preload: true }),
        deny: new Howl({ src: ["/sounds/deny.wav"], preload: true }),
        favorite: new Howl({ src: ["/sounds/favorite.wav"], preload: true }),
        login: new Howl({ src: ["/sounds/login.wav"], preload: true }),
        no_travelers: new Howl({
          src: ["/sounds/no_travelers.wav"],
          preload: true,
        }),
        notice: new Howl({ src: ["/sounds/notice.wav"], preload: true }),
        page_turn: new Howl({ src: ["/sounds/page_turn.wav"], preload: true }),
        reset: new Howl({ src: ["/sounds/reset.wav"], preload: true }),
        toastClose: new Howl({
          src: ["/sounds/toastClose.wav"],
          preload: true,
        }),
        toggle: new Howl({ src: ["/sounds/toggle.wav"], preload: true }),
        unfavorite: new Howl({
          src: ["/sounds/unfavorite.wav"],
          preload: true,
        }),
      };
      Howler.autoUnlock = true;
    }

    window.addEventListener("click", handleUserInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [enableAudio]);

  useEffect(() => {
    if (!data.loading && !data.error && data.travelers.length > 0) {
      setUiState((prev) => {
        return { ...prev, travelerCount: data.travelers.length };
      });
    }
    // Do something maybe a welcome toast or welcome back toast
    let toast;
    if (
      user.googleId &&
      !data.loading &&
      !uiState.loggedIn &&
      !uiState.loggedInFailed
    ) {
      toast = {
        type: "Welcome",
        details: {
          message: "Welcome back to the site!",
        },
      };
    }

    if (uiState.loggedIn) {
      toast = {
        type: "Login",
        details: {
          message: "You have succesfully logged in, welcome!",
        },
      };
    }

    if (uiState.loggedInFailed) {
      toast = {
        type: "Login",
        details: {
          message: "You have failed to login!",
        },
      };
    }

    if (uiState.loggedOut) {
      toast = {
        type: "Logout",
        details: {
          message: "You have logged out!",
        },
      };
    }
    setUiState((prev) => {
      return { ...prev, toast };
    });
  }, [data.loading]);

  useEffect(() => {
    if (
      !uiState.openFilterWindow &&
      !data.travelers &&
      !data.selectedTraveler
    ) {
      setUiState((prev) => {
        return {
          ...prev,
          travelerCount: 0,
        };
      });
      return;
    }
  }, [data.travelers, uiState.openFilterWindow]);

  function handleClickOutside(e, container, state) {
    if (container === e.target.id) return;
    setUiState((prev) => {
      return { ...prev, openThemeSelection: false, [state]: false };
    });
  }

  return (
    <UIContext.Provider
      value={{
        theme,
        playSound,
        uiState,
        setUiState,
        visibleItems,
        userOptions,
        setVisibleItems,
        handleSwitchTheme,
        handleOpenOptions,
        handleSelectOption,
        handleOpenSortDropdown,
        handleCloseSortDropdown,
        handleOpenFilterWindow,
        handleCloseFilterWindow,
        handleClickOutside,
        handleSelectTraveler,
        handleOpenFavorites,
        observeElements,
        createIntersectionHandler,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
