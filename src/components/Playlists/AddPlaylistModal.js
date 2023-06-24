import React, { useState } from "react";
import axios from "axios";

function AddPlaylistModal({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (link === "" || name === "") {
      setErrorMessage("Both 'Playlist's Name' and 'Link' are required.");
      return;
    }

    if (
      !link.includes("spotify") &&
      !link.includes("you") &&
      !link.includes("spot") &&
      !link.includes("youtube")
    ) {
      setErrorMessage("Please provide a valid link for the platform.");
      return;
    }

    try {
      await axios.post("/playlists", {
        name,
        link,
        platform,
      });
      onSubmit();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add a Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Playlist's Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block mb-2">
              Link:
            </label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="platform" className="block mb-2">
              Platform:
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="YouTube">YouTube</option>
              <option value="Spotify">Spotify</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Add Playlist
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

export default AddPlaylistModal;
