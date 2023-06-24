import React from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const SignupSuccess = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-center text-4xl">
      <Confetti numberOfPieces={120} />
      <div>You Have Signed Up Successfully!</div>
      <div>
        <Link to="/">Click to return to the login page!</Link>
      </div>
    </div>
  );
};

export default SignupSuccess;
