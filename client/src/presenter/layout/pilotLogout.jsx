import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PilotLogout = ({ isVisible, username }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  return (
    <div id="pilotSide" className={isVisible ? "drop" : ""}>
      <div id="imgHolder">
        <img src="/images/airPilotHat.svg" alt="Air Pilot Hat" />
      </div>
      <div id="text">
        Pilot: <div id="usernameLogout"> {username ? username : "Username"} </div>
      </div>
      <button id="logout" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default PilotLogout;
