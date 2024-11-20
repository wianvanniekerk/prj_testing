import React, { useState, useEffect } from "react";
import { fetchAllDrones } from "../../../../domain/api/routes/components/drone";
import DroneForm from "./components/droneForm";
import DroneList from "./components/droneList";

const DroneBlock = () => {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState(null);

  const loadDrones = () => {
    fetchAllDrones().then(setDrones).catch(setError);
  };

  useEffect(() => {
    loadDrones();
  }, []);

  return (
    <div className="statsInnerLeft">
      <DroneForm
        drones={drones}
        onDroneAdded={loadDrones}
        onDroneUpdated={loadDrones}
        onDroneDeleted={loadDrones}
      />
      <DroneList drones={drones} error={error} />
    </div>
  );
};

export default DroneBlock;
