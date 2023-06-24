import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../config/AuthContext";
import Countdownlist from "./Countdownlist";
import Login from "./Login/Login";
import { Navigate } from "react-router-dom";

function App() {
  const { isLoggedIn, updateLoginStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const validateJWT = async () => {
      try {
        const response = await axios.get("/validate", {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          updateLoginStatus(true);
        }
      } catch (error) {
        updateLoginStatus(false);
      }
      setIsLoading(false);
    };

    validateJWT();
  }, []);

  if (isLoading) {
    return (
      <div className="content-center">
        Loading... Loading may take up to 30 seconds, be patient
      </div>
    );
  }

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="grid place-items-center text-white flex space-y-4 translate-y-8	">
      <div className="w-full flex justify-center">
        <img
          className="w-3/4 object-contain lg:w-1/5 md:w-1/3 sm:w-1/2"
          src="https://i.ibb.co/Sw7FhTJ/FESTIVERSE-2-removebg-preview-1.png"
          alt=""
        />
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl inline-block align-middle">
        <Countdownlist />
      </div>
      <div className="Login">
        <Login />
      </div>
    </div>
  );
}

export default App;
