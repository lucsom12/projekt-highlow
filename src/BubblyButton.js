import React, { useEffect, useState } from "react";
import "./BubblyButton.scss";

const BubblyButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsAnimating(true);
  };

  return (
    <button
      className={`bubbly-button ${isAnimating ? "animate" : ""}`}
      onClick={handleClick}
    >
      Play
    </button>
  );
};

export default BubblyButton;
