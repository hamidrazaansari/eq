import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create the context for isLogin state
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLogin(true); // Set isLogin to true if token exists
    }
  }, []);

  

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin  }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use IsLoginContext
export const useIsLogin = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useIsLogin must be used within an AuthProvider");
  }
  return context;
};
