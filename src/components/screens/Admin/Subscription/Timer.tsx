import React, { useState, useEffect, memo } from "react";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

interface TimeCounterProps {
  targetUnixTimestamp: number;
}

const TimeCounter: React.FC<TimeCounterProps> = ({ targetUnixTimestamp }) => {
  const calculateTimeDifference = () => {
    const currentDate = new Date();
    const targetDate = new Date(targetUnixTimestamp); // Convert Unix timestamp to milliseconds

    const timeDifference = targetDate.getTime() - currentDate.getTime();

    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { months, days, hours, minutes, seconds };
  };

  const [timeDifference, setTimeDifference] = useState(calculateTimeDifference);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(calculateTimeDifference);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div className="main-timer mt-3">
      <h1>Time Counter</h1>
     <div className="timer mt-3">
     <QueryBuilderIcon className="class-icon" />
      <div className="time">
      <div className="mon tim">
      <p className="mb-3">Months </p>
      <p>{timeDifference.months}</p>
      </div>
      :
      <div className="day tim">
      <p className="mb-3">Days</p>
      <p> {timeDifference.days}</p>
      </div>
      :
      <div className="hours tim">
      <p className="mb-3">Hours</p>
      <p>{timeDifference.hours}</p>
      </div>
      :
      <div className="mints tim">
      <p className="mb-3">Minutes</p>
      <p> {timeDifference.minutes}</p>
      </div>
      :
      <div className="sec tim">
      <p className="mb-3">Seconds </p>
      <p>{timeDifference.seconds}</p>
      </div>
      
      </div>
      
     </div>
    </div>
  );
};

export default memo(TimeCounter);
