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
  
  // const [gohome, setGohome] = useState(0);
  // let retrieve1, retrieve2;
  // if (!gohome) retrieve1 = setTimeout(() => setGohome(1), 3000);
  // useEffect(() => {
  //   if (gohome === 1) {
  //     console.log('gohome 1',gohome)
  //     clearTimeout(retrieve1);
  //     retrieve2 = setTimeout(() => setGohome(2), 100);
  //   }
  //   if (gohome === 2) {
  //     console.log('gohome 2',gohome)
  //     setGohome(3);
  //     clearTimeout(retrieve2);
  //   }
  //   console.log('gohome',gohome)
  // }, [gohome]);
  // const handle = () => {
  //   if (gohome === 0) {
  //     console.log(gohome);
  //     return <Navigate to="/splash" />;
  //   } else if (gohome === 1) {
  //     return <Navigate to="/" />;
  //   }
  // };
  // useEffect(()=>{
  //   clearTimeout(retrieve1,retrieve2)
  // },[])
  //
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
