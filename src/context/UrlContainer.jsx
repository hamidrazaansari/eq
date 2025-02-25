import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const UrlContainer = () => {
  const location = useLocation();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("urlHistory"));

    let newHistory;

    if (!storedHistory) {
      // First time: Set previous as null, current as current page
      newHistory = {
        previous: null,
        current: location.pathname,
      };
      localStorage.setItem("urlHistory", JSON.stringify(newHistory));

    } else {
      newHistory = {
        previous: storedHistory.current, // Store the last current URL in previous
        current: location.pathname, // Update current
      };
      localStorage.setItem("urlHistory", JSON.stringify(newHistory));

    }


  }, [location.pathname]); // Runs when URL changes

  return null;
};
