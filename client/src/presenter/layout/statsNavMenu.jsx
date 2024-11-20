import { Link } from "react-router-dom";

const StatsNavMenu = () => {
  return (
    <div id="statsMenuBlock">
      <div className="statsMenuContent">
        <h4>Stats</h4>
        <Link to="/stats" className="statsLink"><p>General</p></Link>
        <Link to="/stats/livedata" className="statsLink"><p>Live Data</p></Link>
        <Link to="/stats/expedition" className="statsLink"><p>Expedition</p></Link>
        <Link to="/stats/drone" className="statsLink"><p>Drone</p></Link>
      </div>
      <div className="statsMenuContent">
        <Link to="/specs" className="statsLink"><h4>Specs</h4></Link>
      </div>
      <div className="statsMenuContent">
        <Link to="/settings" className="statsLink"><h4>Settings</h4></Link>
      </div>
    </div>
  );
};

export default StatsNavMenu;
