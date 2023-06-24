import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateGroupModal({ onSubmit, onClose }) {
  const [GroupName, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (GroupName === "") {
      setErrorMessage("Group Name is required.");
      return;
    }
    try {
      await axios.post("/groups/create", {
        GroupName,
      });
      onSubmit();
      onClose();
      navigate("/groups");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add a Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="GroupName" className="block mb-2">
              Group Name:
            </label>
            <input
              type="text"
              id="GroupName"
              value={GroupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Create Group
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
