import React from "react";

const DroneList = ({ drones, error }) => (
  <section id="droneList">
    <h1>Your Drones</h1>
    {error && <p>{error}</p>}
    {drones.length > 0 ? (
      <div className="grid-container">
        {drones.map((drone) =>
          drone.droneID ? (
            <div className="grid-item" key={drone._id}>
              <p>
                <strong>Drone Number:</strong> {drone.droneID.droneNum}
              </p>
              <p>
                <strong>Type:</strong> {drone.droneID.droneType}
              </p>
              <p>
                <strong>Flight Hours:</strong> {drone.droneID.flightHours}
              </p>
            </div>
          ) : (
            <div className="grid-item" key={drone._id}>
              <p>Drone data is incomplete.</p>
            </div>
          )
        )}
      </div>
    ) : (
      <p>No drones available.</p>
    )}
  </section>
);

export default DroneList;
