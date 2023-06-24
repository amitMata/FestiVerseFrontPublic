import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Protected from "../userPages/Protected";
import AddPlaylistModal from "./AddPlaylistModal";
import PlaylistItem from "./PlayListItem";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const fetchPlaylists = useCallback(async (selectedOption) => {
    setLoading(true);
    try {
      let url = "/playlists";
      if (selectedOption === "mine") {
        url = "/playlists/user";
      }

      const response = await axios.get(url, {
        withCredentials: true,
      });

      setUserId(response.data.user);
      setPlaylists(response.data.data.playlists);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    fetchPlaylists(e.target.value);
  };

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddPlaylist = () => {
    fetchPlaylists();
  };

  const handleDeletePlaylist = async (id) => {
    const newPlaylists = playlists.filter((playlist) => playlist._id !== id);
    setPlaylists(newPlaylists);
    await fetchPlaylists(selectedOption);
  };

  return (
    <Protected>
      <div>
        <div className="flex flex-col md:flex-row items-center md:justify-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <div className="md:absolute md:left-5 md:top-20">
            <button
              onClick={toggleModal}
              className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110"
            >
              Add a Playlist
            </button>
          </div>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="text-black rounded-md border border-gray-300 bg-white p-2"
          >
            <option value="all">All Playlists</option>
            <option value="mine">My Playlists</option>
          </select>
        </div>
        <div className="flex justify-center mt-4 inline-block">
          {loading ? (
            <p>Loading Playlists...</p>
          ) : (
            <>
              {showModal && (
                <AddPlaylistModal
                  onSubmit={handleAddPlaylist}
                  onClose={toggleModal}
                />
              )}
              <table className="border-separate border-spacing-2 text-center content-center text-sm">
                <thead className="">
                  <th className="px-6 py-3 sm:px-2 sm:py-1 sm:text-sm">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 sm:px-2 sm:py-1 sm:text-sm">
                    Playlist's name
                  </th>
                  <th className="px-6 py-3 sm:px-2 sm:py-1 sm:text-sm">
                    Platform
                  </th>
                </thead>
                <tbody>
                  <PlaylistItem
                    playlist={playlists}
                    onDelete={handleDeletePlaylist}
                    userId={userId}
                  />
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </Protected>
  );
};

export default Playlists;
