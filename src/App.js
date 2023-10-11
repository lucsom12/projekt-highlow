import logo from "./logo.svg";
import "./BubblyButton.scss";
import "./App.css";

import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import ApiHandler from "./ApiHandler";
import { Outlet } from "react-router-dom";
import LandingPage from "./LandingPage";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

function App() {
  return (
    <div className="container">
      <div className="container col-12">
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
        <ul class="nav justify-content-center border-bottom pb-2 mb-3">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">
              Leo Stern
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">
              Luc Sommerland
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">
              Joar Rinaldo-Roos
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">
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

export default App;
