import React, { useState } from "react";
import Protected from "../userPages/Protected";
import StageItem from "./stageItem";
import weekend1 from "../../config/weekend-1.json";
import weekend2 from "../../config/weekend-2.json";

function TMLInfo() {
  const [currentWeekend, setCurrentWeekend] = useState(weekend1);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [activeButtonIndexDate, setActiveButtonIndexDate] = useState(0);
  const [weekendToDisplay, setWeekendToDisplay] = useState(
    "Weekend 1 Artist List:"
  );
  const [dates, setDates] = useState(["July 21st", "July 22nd", "July 23rd"]);

  const handleChooseWeekendOne = () => {
    setCurrentWeekend(weekend1);
    setWeekendToDisplay("Weekend 1 Artists List:");
    setActiveButtonIndex(0);
    setDates(["July 21st", "July 22nd", "July 23rd"]);
  };

  const handleChooseWeekendTwo = () => {
    setCurrentWeekend(weekend2);
    setWeekendToDisplay("Weekend 2 Artists List:");
    setActiveButtonIndex(1);
    setDates(["July 28th", "July 29th", "July 30th"]);
  };

  const handleChooseDate = (index) => {
    setActiveButtonIndexDate(index);
  };

  return (
    <div>
      <Protected>
        <div className="flex flex-col items-center space-y-4 mt-4 text-center">
          <b>Tomorrowland Info</b>

          <div className="space-x-4">
            <button
              className={`rounded-2xl border border-black bg-transparent p-2 hover:scale-110 ${
                activeButtonIndex === 0 ? "font-bold" : "font-normal"
              }`}
              onClick={handleChooseWeekendOne}
            >
              Weekend 1! <br></br>July 21st - July 23rd
            </button>
            <button
              className={`rounded-2xl border border-black bg-transparent p-2 hover:scale-110 ${
                activeButtonIndex === 1 ? "font-bold" : "font-normal"
              }`}
              onClick={handleChooseWeekendTwo}
            >
              Weekend 2! <br></br>July 28th - July 30th
            </button>
          </div>

          <div className="flex space-x-2">
            {dates.map((date, index) => (
              <button
                className={`rounded-2xl border border-black bg-transparent p-2 hover:scale-110 ${
                  activeButtonIndexDate === index ? "font-bold" : "font-normal"
                }`}
                onClick={() => handleChooseDate(index)}
              >
                {date}
              </button>
            ))}
          </div>

          <div>{weekendToDisplay}</div>
          <div>
            <StageItem
              currentWeekend={currentWeekend}
              currentDate={activeButtonIndexDate}
            />
          </div>
        </div>
      </Protected>
    </div>
  );
}

export default TMLInfo;
