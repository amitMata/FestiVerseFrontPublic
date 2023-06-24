import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageBoard = ({ groupName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      const response = await axios.get(`/board-messages/${groupName}`);
      setMessages(response.data.data.messages);
    }

    async function fetchUserData() {
      const response = await axios.get("/getUserData");
      setUserName(response.data.data.user.name);
    }

    fetchMessages();
    fetchUserData();
  }, [groupName]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessage = async (event) => {
    event.preventDefault();

    const response = await axios.post(`/board-messages/${groupName}`, {
      groupName,
      userName,
      message: newMessage,
    });

    setMessages([...messages, response.data.data.message]);
    setNewMessage("");
  };

  const handleDeleteMessage = async (messageId) => {
    await axios.delete(`/board-messages/${messageId}`);
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <div>
              {message.userName} at {new Date(message.time).toLocaleString()}{" "}
              said:
            </div>
            <div style={{ wordWrap: "break-word" }}>
              <b>{message.message}</b>{" "}
              {message.userName === userName && (
                <button onClick={() => handleDeleteMessage(message._id)}>
                  <img
                    src="https://i.ibb.co/pdsZQYF/kindpng-2260721.png"
                    alt="Delete"
                    style={{ width: "10px", height: "20px" }}
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleNewMessage}>
        <input
          className="text-black m-4"
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
        />
        <br></br>
        <button
          className="rounded-2xl border border-black bg-transparent p-3 hover:scale-110"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageBoard;
