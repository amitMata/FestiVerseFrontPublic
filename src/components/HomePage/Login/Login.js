import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../config/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading status

  const navigate = useNavigate();
  const { updateLoginStatus } = useAuth();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when login process starts
    if (password.includes("<") || password.includes(">")) {
      setErrorMessage("Password cannot contain < or >.");
      setIsLoading(false); // Set loading to false when encountering error
      return;
    }
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        updateLoginStatus(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
    setIsLoading(false); // Set loading to false when login process ends
  }

  return (
    <div className="text-center bg-gray-900 p-7 py-7 rounded-lg">
      <form onSubmit={handleLoginSubmit}>
        <Link className="" to="/signup">
          Click here to Signup
        </Link>
        <h2 className="text-3xl	p-4">Sign In</h2>
        <div className="text-gray-400">
          <label>Email </label>
          <br></br>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blur-blue-800"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="text-gray-400 p-1">
          <label>Password </label>
          <br></br>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blur-blue-800"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br></br>
        <button>Sign In</button>
        {errorMessage && <p>{errorMessage}</p>}
        {isLoading && (
          <p className="text-sm">
            <br></br>Signing in...
          </p>
        )}
      </form>
    </div>
  );
}
