import React from "react";
import axios from "axios";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      Logout
    </button>
  );
};

export default Logout;
