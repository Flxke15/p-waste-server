import React, {useState, useEffect, Component} from "react";
import axios from "axios";
import Navbar from "./component/navbar";
import Login from "./Pages/login";
import {GoogleApiWrapper, Map} from "google-maps-react";

function App() {
  return (
      <Login/>
  );
}

export default App;
