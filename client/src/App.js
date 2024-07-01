import React, { useEffect, useRef, useState } from "react";

import {
  BrowserRouter,
  Routes as Router,
  Route,
  Navigate,
} from "react-router-dom";

import Earn from "./pages/Earn/Earn";
import Splash from "./pages/Splash/splash";

import Homepage from "./pages/Home";
import Wallet from "./pages/Wallet/wallet";
import LoadingPage from "./components/Loading";

const App = () => {
  return (
    <LoadingPage>
      <BrowserRouter>
        <Router>
          <Route path="/splash" element={<Splash />} />
          <Route path="/" element={<Homepage />} key="1" />
          <Route path="/earn" element={<Earn />} />
          <Route path="/wallet" element={<Wallet />} />
        </Router>
      </BrowserRouter>
    </LoadingPage>
  );
};

export default App;
