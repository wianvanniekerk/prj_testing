import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isArrowOpen, setArrow] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const toggleButton = () => {
    setArrow(!isArrowOpen);
  };

  const navigate = useNavigate();

  return (
    <div id="navMenu">
      <nav className={isNavVisible ? "show" : "hide"}>
        <div>
          <img src="/images/future.svg" alt="Futures" onClick={() => navigate("/stats")} />
        </div>
        <div>
          <img src="/images/drone.svg" alt="Drone" onClick={() => navigate("/specs")} />
        </div>
        <div>
          <img
            src="/images/services.svg"
            alt="Services"
            onClick={() => navigate("/settings")}
          />
        </div>
      </nav>
      <div
        id="arrowButton"
        onClick={() => {
          toggleNav();
          toggleButton();
        }}
        className={isArrowOpen ? "show" : "notShow"}
      ></div>
    </div>
  );
};

export default NavMenu;
