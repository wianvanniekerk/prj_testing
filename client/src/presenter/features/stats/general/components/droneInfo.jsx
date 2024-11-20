import React from "react";

const DroneInfo = ({ droneID, setDroneID, droneData }) => (
  <section>
    <section id="headerStats">
      <h1><u>Drone ID:</u></h1>
      <input
        type="text"
        placeholder="Enter droneID"
        value={droneID}
        onChange={(e) => setDroneID(e.target.value)}
      />
    </section>
    <section className="generalStatsInfo">
      <div>
        <h1><u>Drone type:</u></h1>
        <p>{droneData.droneStats?.droneType || "N/A"}</p>
      </div>
      <div>
        <h1><u>Flight hours:</u></h1>
        <p>{droneData.droneStats?.flightHours || "N/A"}</p>
      </div>
    </section>
  </section>
);

export default DroneInfo;
