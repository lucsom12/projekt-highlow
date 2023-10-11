import logo from "./logo.svg";
import "./BubblyButton.scss";
import "./App.css";

import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import ApiHandler from "./ApiHandler";
import { NavLink, Outlet } from "react-router-dom";
import LandingPage from "./LandingPage";
import HomePage from "./components/HomePage";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

export default function App() {
  return (
    <div className="container">
      <div className="container col-12">
        <DevNavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="container">
      <footer className=" footer">
        <ul class="nav col-10 offset-1 justify-content-center border-bottom rounded-circle pb-2 mb-3">
          <li class="nav-item">
            <a href="https://github.com/sternleo" target="_blank" className="nav-link px-2 text-body-secondary">
              Leo Stern
            </a>
          </li>
          <li class="nav-item">
            <a href="https://github.com/lucsom12" target="_blank" className="nav-link px-2 text-body-secondary">
              Luc Sommerland
            </a>
          </li>
          <li class="nav-item">
            <a href="https://github.com/Joar-Rinaldo-Roos" target="_blank" className="nav-link px-2 text-body-secondary">
              Joar Rinaldo-Roos
            </a>
          </li>
          <li class="nav-item">
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