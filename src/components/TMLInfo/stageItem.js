import React, { useState, useEffect } from "react";
import ArtistModal from "./ArtistModal";
import axios from "axios";

const StageItem = ({ currentWeekend, currentDate }) => {
  const [dataOfTheDay, setDataOfTheDay] = useState(currentWeekend[currentDate]);
  const [accessToken, setAccessToken] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDataOfTheDay(currentWeekend[currentDate]);
  }, [currentWeekend, currentDate]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/spotify");
        const accessToken = response.data.accessToken;
        setAccessToken(accessToken);
      } catch (error) {
        console.error("Error fetching token", error);
      }
    };

    fetchToken();
  }, []);

  const handleFetch = async (name) => {
    // search for the artist's ID
    let searchUrl = `/spotify/search/${encodeURIComponent(
      name
    )}/${accessToken}`;
    try {
      const artistIdResponse = await axios.get(searchUrl);
      const artistId = artistIdResponse.data.artistId;

      // get the artist's data
      let artistUrl = `/spotify/artist/${artistId}/${accessToken}`;
      const artistData = await axios.get(artistUrl);
      setModalData(artistData.data); // Set the artist data in the modalData state
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching artist data", error);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold dark:text-white mb-px ">
        {dataOfTheDay.Date}
        <br></br>
      </div>
      <div className="flex flex-wrap -m-4 justify-center my-1.5 ">
        {dataOfTheDay.data.map((item, index) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg border m-4 w-full sm:w-1/2 md:w-1/3 bg-indigo-900	bg-opacity-80"
            key={index}
          >
            <div className="px-6 py-4 flex flex-col items-center">
              <div className="font-bold text-xl mb-4">{item.stage}</div>
              {item.artists.map((artist, artistIndex) => (
                <button
                  className="block mb-2 text-white"
                  onClick={() => handleFetch(artist)}
                  key={artistIndex}
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {isModalOpen && (
          <ArtistModal data={modalData} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default StageItem;
