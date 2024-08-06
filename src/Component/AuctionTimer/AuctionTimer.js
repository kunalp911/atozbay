import { useEffect, useState } from "react";

export const AuctionTimer = ({ createdAt, auctionDuration, onTimeEnd }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      const endTime = new Date(createdAt);
      endTime.setHours(endTime.getHours() + auctionDuration * 24);

      const now = new Date();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        setRemainingTime("Auction ended");
        onTimeEnd();
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        setRemainingTime(`${days}d ${hours}h ${minutes}m left`);
      }
    };
    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt, auctionDuration]);

  return (
    <span
      style={{
        color: "#f00",
        fontSize: "14px",
      }}
    >
      {remainingTime}
    </span>
  );
};
