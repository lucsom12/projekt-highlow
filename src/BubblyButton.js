import React, { useEffect, useState } from "react";
import "./BubblyButton.scss";
import { Navigate, useNavigate } from "react-router";

const BubblyButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleClick = (e) => {
    e.preventDefault();

    setIsAnimating(true);
    timeout(2)
    //window.location.href = "http://localhost:3000/search"; //todo wrong navigate
    navigate("/search")
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
