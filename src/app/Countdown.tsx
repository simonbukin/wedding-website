import React, { useEffect, useState } from "react";

const checkPlural = (num: number) => {
  return num === 1 ? "" : "s";
};

interface CountdownProps {
  date: Date;
}

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = date.getTime() - now;

      setTimeLeft(distance);

      if (distance <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      <p>
        {days} day{checkPlural(days)}, {hours} hour{checkPlural(hours)},{" "}
        {minutes} minute{checkPlural(minutes)}, {seconds} second
        {checkPlural(seconds)} until the big day!
      </p>
    </div>
  );
};

export default Countdown;
