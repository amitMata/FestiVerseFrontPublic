import React, { useEffect } from "react";
import Countdownlist from "../HomePage/Countdownlist";
import Protected from "./Protected";

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Protected>
      <div className="text-center p-10">
        <h1 className="">Hello!</h1>
        <p className=" ">Welcome to your dashboard.</p>
      </div>
      <div className="text-center text-xl md:text-xl lg:text-2xl">
        Time to Tomorrowland:
        <Countdownlist />
      </div>
    </Protected>
  );
}
