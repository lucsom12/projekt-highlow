import "./App.css";
import React, { useEffect, useState } from "react";

import { NavLink, Outlet } from "react-router-dom";


const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

export default function App() {
  return (
    <div className="container">
      <DevNavBar />
      <Outlet />
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
        <NavLink className="nav-link" to="/devF">
          devFirebase
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/leader-board">
          LeaderBoard
        </NavLink>
      </li>
    </ul>
  )
}

