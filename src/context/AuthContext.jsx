import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create the context for isLogin state
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const loginTime = localStorage.getItem("loginTimestamp");

    if (token && loginTime) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(loginTime, 10);

      if (timeElapsed >= 10 * 60 * 60 * 1000) {
        // If 2 hours have passed, remove token and set isLogin to false
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginTimestamp");
        setIsLogin(false);
        toast.warning("Session expired. Please log in again.");
      } else {
        setIsLogin(true);

        // Set a timeout to log out automatically after the remaining time
        setTimeout(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("loginTimestamp");
          setIsLogin(false);
          toast.warning("Session expired. Please log in again.");
          navigate("/"); // Redirect to login page
        }, 10 * 60 * 60 * 1000 - timeElapsed);
      }
    }
  }, []);

  // Function to handle login
  const login = (token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("loginTimestamp", Date.now().toString());
    setIsLogin(true);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useIsLogin = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useIsLogin must be used within an AuthProvider");
  }
  return context;
};
