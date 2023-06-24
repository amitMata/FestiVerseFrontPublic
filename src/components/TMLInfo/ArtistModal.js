import React, { useEffect, useRef } from "react";

function ArtistModal({ data, onClose }) {
  const modalRef = useRef();
  const spotifyUrl = data.external_urls.spotify;

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg max-w-xs sm:max-w-lg mx-4 flex flex-col justify-between overflow-hidden"
      >
        <img
          src={data.images[0]?.url}
          className="object-cover h-64 w-full rounded-lg mt-4"
          alt="Artist"
        />
        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-4 text-black">{data.name}</h2>
          {data.genres.length > 0 && (
            <div className="mb-4 text-black">
              <label className="block mb-2">
                <b>Genres:</b>
              </label>
              <p>{data.genres.join(", ")}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-end">
          <div className="mb-4">
            <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
              <img
                src="https://i.ibb.co/F8DcjPP/spotify-logo-streaming-media-apple-music-others-0c569582416ea66b0b5d01d0fbefb1bd.png"
                className="w-12 h-12 mb-4"
                alt="Logo"
              />
            </a>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistModal;
