import React, { useState, useEffect, memo } from "react";

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
    <div>
      <h1>Time Counter</h1>
      <p>Months: {timeDifference.months}</p>
      <p>Days: {timeDifference.days}</p>
      <p>Hours: {timeDifference.hours}</p>
      <p>Minutes: {timeDifference.minutes}</p>
      <p>Seconds: {timeDifference.seconds}</p>
    </div>
  );
};

export default memo(TimeCounter);
