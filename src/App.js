import "./BubblyButton.scss";
import "./App.css";

import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();


  useEffect(() => {
    // const app = initializeApp(firebaseConfig);
    setGameStarted(false);
  }, [location]);
  return (
    <div className="container">
      <div className="col-12">
        {!gameStarted && <DevNavBar />}
        <Outlet context={{ setGameStarted }} />
      </div>
      {!gameStarted && <Footer />}
    </div>
  );
}

function Footer() {
  return (
    <div className="container">
      <footer className=" footer">
        <ul className="nav col-10 offset-1 justify-content-center border-bottom rounded-circle pb-2 mb-3">
          <li className="nav-item">
            <a href="https://github.com/sternleo" target="_blank" className="nav-link px-2 text-body-secondary">
              Leo Stern
            </a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/lucsom12" target="_blank" className="nav-link px-2 text-body-secondary">
              Luc Sommerland
            </a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/Joar-Rinaldo-Roos" target="_blank" className="nav-link px-2 text-body-secondary">
              Joar Rinaldo-Roos
            </a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/AdamTegelberg" target="_blank" className="nav-link px-2 text-body-secondary">
              Adam Tegelberg Hägnefors
            </a>
          </li>
        </ul>
        <p className="text-center text-body-secondary">
          EDAF90 - webprogrammering
        </p>
      </footer>
    </div>
  );
}

function DevNavBar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/home">
          Hem
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/search">
          game
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/leader-board/:score/:artist">
          LeaderBoard
        </NavLink>
      </li>
    </ul>
  )
}