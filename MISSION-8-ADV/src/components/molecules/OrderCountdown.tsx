import React, { useEffect, useState } from "react";

type OrderCountdownProps = {
  hours: string;
  minutes: string;
  seconds: string;
};

const OrderCountdown: React.FC<OrderCountdownProps> = ({
  hours,
  minutes,
  seconds,
}) => {
  const [time, setTime] = useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        const { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let newHours = hours;
        let newMinutes = minutes;
        let newSeconds = seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return {
          hours: Math.max(newHours, 0),
          minutes: Math.max(newMinutes, 0),
          seconds: Math.max(newSeconds, 0),
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="w-full mb-5">
      <div className="bg-[#fae8d4]">
        <div className="flex items-center justify-between p-3 md:justify-center">
          <p className="text-gray-700 px-2">Selesaikan pesanan dalam</p>
          <div className="flex items-center gap-2">
            <TimeBlock value={format(time.hours)} />
            <Separator />
            <TimeBlock value={format(time.minutes)} />
            <Separator />
            <TimeBlock value={format(time.seconds)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeBlock: React.FC<{ value: string }> = ({ value }) => (
  <button className="bg-[#f54720] text-white px-2 py-1 rounded-md min-w-[32px] text-center">
    {value}
  </button>
);

const Separator = () => <p className="text-gray-700">:</p>;

export default OrderCountdown;