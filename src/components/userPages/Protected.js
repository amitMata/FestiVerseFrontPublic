import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../config/AuthContext";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";

const Protected = ({ children }) => {
  const { isLoggedIn, updateLoginStatus } = useAuth();

  useEffect(() => {
    const validateJWT = async () => {
      try {
        const response = await axios.get("/validate", {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          updateLoginStatus(true);
        } else {
          updateLoginStatus(false);
        }
      } catch (error) {
        updateLoginStatus(false);
      }
    };

    validateJWT();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Protected;
