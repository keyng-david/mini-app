import React, { useEffect, useRef, useState } from "react";

import {
  BrowserRouter,
  Routes as Router,
  Route,
  Navigate,
} from "react-router-dom";

import Earn from "./pages/Earn/Earn.js";
import Splash from "./pages/Splash/splash.js";

import Homepage from "./pages/Home.js";
import Wallet from "./pages/Wallet/wallet.js";
import LoadingPage from "./components/Loading.js";

const App = () => {
  return (
    <LoadingPage>
      <BrowserRouter>
        <Router>
          <Route path="/splash" element={<Splash />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/wallet" element={<Wallet />} />
        </Router>
      </BrowserRouter>
    </LoadingPage>
  );
};

export default App;
