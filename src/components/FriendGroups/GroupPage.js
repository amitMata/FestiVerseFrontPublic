import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Protected from "../userPages/Protected";
import MessageBoard from "./MessageBoard";

const GroupPage = () => {
  const { groupName } = useParams();
  const [group, setGroup] = useState(null);
  const [forbidden, setForbidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroupData() {
      try {
        const url = `/group/${groupName}`;
        const response = await axios.get(url, { withCredentials: true });

        if (response.data.status === "success") {
          setGroup(response.data.data.group);
        }
      } catch (err) {
        if (err.response.status === 403) {
          setForbidden(true);
        } else {
          console.log(err);
        }
      }
    }

    fetchGroupData();
  }, [groupName]);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  if (forbidden) {
    return (
      <Protected>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <p>You are not allowed to access this group.</p>
          <button
            className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110 absolute top-16 left-5 m-2"
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      </Protected>
    );
  }

  if (!group) {
    return (
      <Protected>
        <div className="flex flex-col items-center space-y-4 mt-4 text-center">
          Loading...
        </div>
      </Protected>
    );
  }

  const handleGoToGroupsPage = () => {
    navigate("/groups");
  };

  return (
    <Protected>
      <div className="flex flex-col items-center space-y-6 mt-4 text-center">
        <h1>
          Group's Name:<br></br> <b>{group.groupName}</b>
        </h1>
        <p>
          Participants: <br></br>
          {group.participants.join(", ")}
        </p>
        <h2>
          <b>Message Board:</b>
        </h2>
        <MessageBoard groupName={group.groupName} />

        <button
          onClick={handleGoToGroupsPage}
          className="rounded-2xl border border-black bg-transparent p-2 hover:scale-110"
        >
          Back to the Groups Page!
        </button>
      </div>
    </Protected>
  );
};

export default GroupPage;
