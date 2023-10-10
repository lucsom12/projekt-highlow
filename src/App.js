import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import ApiHandler from "./ApiHandler";
import { Outlet } from "react-router-dom";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

export default function App() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}

