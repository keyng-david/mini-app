import React, { useEffect, useRef, useState,useMemo } from "react";
import { useIntegration } from '@tma.js/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator, useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
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
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
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
    </AppRoot>
  );
};

export default App;
