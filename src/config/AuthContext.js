import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  const value = {
    isLoggedIn,
    updateLoginStatus,
    isUserLoggedIn: isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
