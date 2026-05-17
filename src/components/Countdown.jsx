import { useEffect, useState } from "react";

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="text-white border border-white rounded-md w-14 h-14 flex flex-col items-center justify-center text-md font-bold shadow p-1">
        <p>{value}</p>
        <hr className="w-full border-t border-white my-1" />
        <p className="text-[7px] capitalize">{label}</p>
      </div>
    </div>
  );

  return (
    <>
      <h2 className="mt-3 text-white italic">Countdown</h2>
      <div className="flex gap-4 items-center mt-2">
        <Box value={timeLeft.days} label="DAYS" />
        <Box value={timeLeft.hours} label="HOURS" />
        <Box value={timeLeft.minutes} label="MINUTES" />
      </div>
    </>
  );
}

export default Countdown;