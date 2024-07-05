import React, { useEffect, useRef, useState, useMemo } from "react";
import { useIntegration } from "@tma.js/react-router-integration";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@tma.js/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
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
import Invite from "./pages/Invite/invite.js";

const App = () => {
  // const lp = useLaunchParams();
  // const miniApp = useMiniApp();
  // const themeParams = useThemeParams();
  // const viewport = useViewport();

  // useEffect(() => {
  //   return bindMiniAppCSSVars(miniApp, themeParams);
  // }, [miniApp, themeParams]);

  // useEffect(() => {
  //   return bindThemeParamsCSSVars(themeParams);
  // }, [themeParams]);

  // useEffect(() => {
  //   return viewport && bindViewportCSSVars(viewport);
  // }, [viewport]);

  // const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  // const [location, reactNavigator] = useIntegration(navigator);
  return (
    // <AppRoot
    //   appearance={miniApp.isDark ? "dark" : "light"}
    //   platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    // >
    <LoadingPage>
      <BrowserRouter>
        <Router>
          <Route path="/splash" element={<Splash />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/invite" element={<Invite />} />
        </Router>
      </BrowserRouter>
    </LoadingPage>
    // </AppRoot>
  );
};

export default App;

// import { useIntegration } from "@tma.js/react-router-integration";
// import {
//   bindMiniAppCSSVars,
//   bindThemeParamsCSSVars,
//   bindViewportCSSVars,
//   initNavigator,
//   useLaunchParams,
//   useMiniApp,
//   useThemeParams,
//   useViewport,
// } from "@tma.js/sdk-react";
// import { AppRoot } from "@telegram-apps/telegram-ui";
// import { useEffect, useMemo } from "react";
// import { Navigate, Route, Router, Routes } from "react-router-dom";
// import {
//   WebAppProvider,
//   MainButton,
//   BackButton,
// } from "@vkruglikov/react-telegram-web-app";

// import { routes } from "./components/navigation/routes";
// import LoadingPage from "./components/Loading";

// /**
//  * @return {JSX.Element}
//  */
// export function App() {
//   const lp = useLaunchParams();
//   const miniApp = useMiniApp();
//   const themeParams = useThemeParams();
//   const viewport = useViewport();

//   useEffect(() => {
//     return bindMiniAppCSSVars(miniApp, themeParams);
//   }, [miniApp, themeParams]);

//   useEffect(() => {
//     return bindThemeParamsCSSVars(themeParams);
//   }, [themeParams]);

//   useEffect(() => {
//     return viewport && bindViewportCSSVars(viewport);
//   }, [viewport]);

//   // Create a new application navigator and attach it to the browser history, so it could modify
//   // it and listen to its changes.
//   const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
//   const [location, reactNavigator] = useIntegration(navigator);

//   // Don't forget to attach the navigator to allow it to control the BackButton state as well
//   // as browser history.
//   useEffect(() => {
//     navigator.attach();
//     return () => navigator.detach();
//   }, [navigator]);

//   return (
//     <AppRoot
//       appearance={miniApp.isDark ? "dark" : "light"}
//       platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
//     >
//       <Router location={location} navigator={reactNavigator}>
//         <LoadingPage>
//           <Routes>
//             {routes.map((route) => (
//               <Route key={route.path} {...route} />
//             ))}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </LoadingPage>
//       </Router>
//     </AppRoot>
//   );
// }

// export default App;

// {/** Use components inside provider */}
// <MainButton {...} />
// <BackButton {...} />
