import React, { useEffect } from "react";

const LoadingScreen = () => {
  useEffect(() => {
    document.body.classList.add("loadingBackground");

    return () => {
      document.body.classList.remove("loadingBackground");
    };
  }, []);

  return (
    <div id="loading-container">
      <img src="/images/droneBottom.svg" alt="Loading" className="droneLoad" />
    </div>
  );
};

export default LoadingScreen;
