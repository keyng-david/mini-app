import React, { useState, useEffect } from "react";
import Splash from "../pages/Splash/splash.js";

const LoadingPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          {/* <h1>Loading...</h1> */}
          <Splash />
        </div>
      ) : (
        <div>
          {/* <h1>Welcome to the app!</h1>
          Your main app content goes here */}
          {props.children}
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
