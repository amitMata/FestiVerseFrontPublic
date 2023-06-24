import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validatePassword(password, email) {
    if (password.length > 20) {
      return "Password must be at most 20 characters long.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (password.includes("<") || password.includes(">")) {
      return "Email and password must not contain '<' or '>'.";
    }
    return null;
  }

  async function registerUser(e) {
    e.preventDefault();
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePassword(confirmPassword);

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (confirmPasswordError) {
      setErrorMessage(confirmPasswordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/register", {
        email,
        name,
        password,
      });
      navigate("/SignupSuccess");
    } catch (e) {
      setErrorMessage(
        "An error occurred during the registration process. Please try again."
      );
    }
    setIsLoading(false);
  }

  return (
    <div className="text-center box-sizing box-content flex-content grid h-screen place-items-center pb-10">
      <form
        className="bg-gray-900 p-10 py-10 rounded-lg flex-1 w-64 z-10"
        onSubmit={registerUser}
      >
        <h2 className="text-4xl dark:text-white font-bold py-2">Sign Up</h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Email</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blur-blue-800"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Name</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blur-blue-800"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Password</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blur-blue-800"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Confirm Password</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blur-blue-800"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="my-5">Sign Up</button>
        {isLoading && (
          <p className="text-sm">
            <br></br>Signing up...
          </p>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}
