import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./burgerMenu";
import PilotLogout from "./pilotLogout";


function Header() {
  const [isPilotVisible, setPilotVisible] = useState(false);
  const [isBurgerVisible, setBurgerVisible] = useState(false);

  const username = localStorage.getItem("username");

  const togglePilot = () => {
    setPilotVisible(!isPilotVisible);
  };

  const toggleBurger = () => {
    setBurgerVisible(!isBurgerVisible);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest("#pilot")) {
      setPilotVisible(false);
    }
  };

  useEffect(() => {
    if (isPilotVisible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isPilotVisible]);

  return (
    <header>
      <div id="burger">
        <img src="/images/burgerMenu.svg" alt="" onClick={toggleBurger} />
        <BurgerMenu isVisible={isBurgerVisible} />
      </div>
      <div id="logo">
        <img src="/images/droneBottom.svg" alt="Drone Logo" />
        <Link to="/info" id="infoLink">
          Drone Tech
        </Link>
      </div>
      <img
        src="/images/airPilotHat.svg"
        alt="Air Pilot Hat"
        id="pilot"
        onClick={togglePilot}
      />
      <PilotLogout isVisible={isPilotVisible} username={username} />
    </header>
  );
}

export default Header;
