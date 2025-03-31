import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WatchFlipCounter = () => {
  const [time, setTime] = useState({
    hours: 1,
    minutes: 59,
    seconds: 43,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;
        seconds++;

        if (seconds > 59) {
          seconds = 0;
          minutes++;
        }
        if (minutes > 59) {
          minutes = 0;
          hours++;
        }
        if (hours > 99) {
          hours = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
    <div className="flex w-48 h-16 mt-5 items-center justify-center space-x-2 bg-black p-5 rounded-full">
      <Digit number={time.hours} className="border border-yellow-500"/>
      <span className="text-white text-2xl">:</span>
      <Digit number={time.minutes} />
      <span className="text-white text-2xl">:</span>
      <Digit number={time.seconds} />
    </div>
    </div>
  );
};

function Digit({ number }) {
  return (
    <motion.div
      key={number} // Ensures animation triggers on change
      className="relative w-8 h-8 bg-white text-black text-xl font-bold flex items-center justify-center rounded-md shadow-md"
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {number.toString().padStart(2, "0")}
    </motion.div>
  );
}

export default WatchFlipCounter;

