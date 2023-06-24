import React from "react";
import axios from "axios";

const PlaylistItem = ({ playlist, onDelete, userId }) => {
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/playlists/${_id}`);
      onDelete(_id);
    } catch (error) {
      console.error(error);
    }
  };

  return playlist.map((currentPlaylist) => {
    const { name, link, platform, UserID, _id, uploader } = currentPlaylist;

    const imageSource =
      platform === "YouTube"
        ? "https://i.ibb.co/sjnnZ3D/paper-black-and-white-logo-pattern-youtube-play-button-6f7fda0489cbea1d1b4a036e5a111e85.png"
        : "https://i.ibb.co/QNDDLW7/pngegg.png";

    return (
      <tr key={_id}>
        <td className="">
          <div className="flex items-center justify-center h-full">
            {uploader}
          </div>
        </td>
        <td className="">
          <div className="flex items-center justify-center h-full">{name}</div>
        </td>
        <td className="">
          <div className="flex items-center justify-center h-full">
            <a
              href={link.startsWith("http") ? link : `https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="w-12 h-12" src={imageSource} alt={platform} />
            </a>
          </div>
        </td>
        <td className="">
          <div className="flex items-center justify-center h-full">
            {UserID === userId && (
              <button onClick={() => handleDelete(_id)}>
                <img
                  src="https://i.ibb.co/pdsZQYF/kindpng-2260721.png"
                  alt="Delete"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  });
};

export default PlaylistItem;
