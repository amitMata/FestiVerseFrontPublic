import React, { useState, useEffect } from "react";

function Countdownlist() {
  const [time, setTime] = useState("");
  useEffect(() => {
    let countDownDate = new Date("Jul 20, 2023 20:00:00").getTime();
    let x = setInterval(() => {
      let now = new Date().getTime();

      let differenceInDates = countDownDate - now;

      let days = Math.floor(differenceInDates / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (differenceInDates % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (differenceInDates % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((differenceInDates % (1000 * 60)) / 1000);

      setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

      if (differenceInDates < 0) {
        clearInterval(x);
        setTime("ARE YOU READY???");
      }
    }, 1000);
  }, []);
  return <div style={style}>{time}</div>;
}

const style = {
  fontSize: "2.7rem",
  textAlign: "center",
  marginTop: "20px",
  transform: "translateY(-50%)",
};

export default Countdownlist;
