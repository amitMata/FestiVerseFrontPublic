import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Protected from "../userPages/Protected";
import CreateGroupModal from "./CreateGroupModal";
import axios from "axios";

const FriendsGroup = () => {
  const [allGroupNames, setAllGroupNames] = useState([]);
  const [filteredGroupNames, setFilteredGroupNames] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userGroup, setUserGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const fetchAllGroupNames = useCallback(async () => {
    try {
      const url = "/groups";
      const response = await axios.get(url, { withCredentials: true });

      setAllGroupNames(response.data.data.groups);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const url = "/getUserData";
      const response = await axios.get(url, { withCredentials: true });

      setUserGroup(response.data.data.user.groupNameOfUser);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllGroupNames();
    fetchUserData();
  }, [fetchAllGroupNames, fetchUserData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredGroups = allGroupNames.filter((group) =>
        group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGroupNames(filteredGroups);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, allGroupNames]);

  const handleChangeInSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectGroup = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleJoinGroup = async () => {
    try {
      const url = "/groups/join";
      const groupName = selectedGroup;
      const response = await axios.post(url, {
        groupName,
      });

      if (response.data.status === "success") {
        setUserGroup(groupName);
      }
      // Refresh user data after joining a group
      fetchUserData();
      navigate("/groups");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const url = "/groups/leave";
      const groupName = userGroup;
      await axios.post(
        url,
        {
          groupName,
        },
        { withCredentials: true }
      );

      // Reset user group after leaving
      setUserGroup(null);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleGoToGroupPage = async () => {
    try {
      const url = `/groups/${userGroup}`;
      const response = await axios.get(url, { withCredentials: true });

      if (response.data.status === "success") {
        navigate(`/group/${userGroup}`);
      } else {
        // Handle unauthorized access to group page
        console.log("You are not a participant in this group.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Protected>
      {loading ? (
        <div className="flex flex-col items-center space-y-4 mt-4 text-center">
          Loading...
        </div>
      ) : (
        <div>
          {userGroup ? (
            <div className="flex flex-col items-center space-y-4 mt-4">
              <h2>Your Group: {userGroup}</h2>
              <button
                onClick={handleGoToGroupPage}
                className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110"
              >
                Go to Group's Page!
              </button>
              <button
                onClick={handleLeaveGroup}
                className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110"
              >
                Leave Group
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 mt-4 lg:items-start">
              <button
                onClick={toggleModal}
                className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110 lg:absolute lg:top-16 lg:left-5 m-2"
              >
                Create a Group
              </button>
              {showModal && (
                <CreateGroupModal
                  onSubmit={() => {
                    fetchAllGroupNames();
                    fetchUserData();
                  }}
                  onClose={toggleModal}
                />
              )}
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="text-center">Search For a Group:</div>
                <input
                  onChange={handleChangeInSearchInput}
                  value={searchQuery}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-black text-center text-2xl"
                ></input>
                <select
                  value={selectedGroup}
                  onChange={handleSelectGroup}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-black text-center text-2xl"
                >
                  <option value="">Select</option>
                  {filteredGroupNames.map((group) => (
                    <option key={group._id} value={group.groupName}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleJoinGroup}
                  className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110"
                >
                  Join Group!
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Protected>
  );
};

export default FriendsGroup;
