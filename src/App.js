import "./App.css";
import React, { useEffect, useState } from "react";
import ApiHandler from "./ApiHandler";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-bootstrap";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

export default function App() {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
      <ApiHandler />
    </div>
  );
}
function NavBar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Hem
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">
          Kundvagn
        </NavLink>
      </li>
      {/* more links */}
    </ul>

  )
}

