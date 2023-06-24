import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const isLoggedIn = true;

  if (isLoggedIn) {
    return (
      <nav className="sticky top-0 bg-gray-900 mx-auto px-4 ">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-white font-bold text-xs md:text-sm lg:text-2xl"
            >
              FestiVerse
            </Link>
          </div>
          <div className="md:flex md:items-center">
            <div className="flex h-full items-center">
              <Link
                to="/Playlists"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xs md:text-sm font-medium"
              >
                Playlists
              </Link>

              <Link
                to="/TMLInfo"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xs md:text-sm font-medium"
              >
                TML Info
              </Link>

              <Link
                to="/groups"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xs md:text-sm font-medium"
              >
                Friends Group
              </Link>

              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xs md:text-sm font-medium"
                href="/"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};

export default NavBar;
