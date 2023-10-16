import "./BubblyButton.scss";
import "./App.css";
import firebaseConfig from "./components/firebase-config";

import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setGameStarted(false);
  }, [location]);
  return (
    <div className="container-md" style={{ height: "100vh", overflow: "auto" }}>
      <div className="col-12 ">
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
            <a
              href="https://github.com/sternleo"
              rel="noreferrer"
              target="_blank"
              className="nav-link px-2 text-body-secondary"
            >
              Leo Stern
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/lucsom12"
              rel="noreferrer"
              target="_blank"
              className="nav-link px-2 text-body-secondary"
            >
              Luc Sommerland
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/Joar-Rinaldo-Roos"
              rel="noreferrer"
              target="_blank"
              className="nav-link px-2 text-body-secondary"
            >
              Joar Rinaldo-Roos
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/AdamTegelberg"
              rel="noreferrer"
              target="_blank"
              className="nav-link px-2 text-body-secondary"
            >
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
    <ul className="nav nav-tabs border-0">
      <li className="nav-item nav-item-styling mx-1s">
        <NavLink
          className="nav-link nav-link-styling"
          to="/home"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#fff",
                  background: "#5C00FF",
                  borderRadius: "0px",
                }
              : { borderRadius: "0px", color: "#FFFFFF", background: "" }
          }
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item nav-item-styling mx-1">
        <NavLink
          className="nav-link nav-link-styling"
          to="/search"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#fff",
                  background: "#5C00FF",
                  borderRadius: "0px",
                }
              : { borderRadius: "0px", color: "#FFFFFF", background: "" }
          }
        >
          Game
        </NavLink>
      </li>
      <li className="nav-item nav-item-styling">
        <NavLink
          className="nav-link nav-link-styling mx-1"
          to="/leader-board/:score/:artist"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#fff",
                  background: "#5C00FF",
                  borderRadius: "0px",
                }
              : { borderRadius: "0px", color: "#FFFFFF", background: "" }
          }
        >
          LeaderBoard
        </NavLink>
      </li>
    </ul>
  );
}
