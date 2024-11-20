import { useState } from "react";
import useFetchDroneData from "../../../hooks/useDroneData";
import DroneInfo from "./components/droneInfo";
import ExpeditionData from "./components/expeditionData";
import PieChartSection from "./components/pieChartBlock";


const StatsBlock = () => {
  const [droneID, setDroneID] = useState("");
  const { droneData, expeditionData } = useFetchDroneData(droneID);
  return (
      <div class="statsInnerLeft">
        {/* <DroneInfo
          droneID={droneID}
          setDroneID={setDroneID}
          droneData={droneData}
        /> */}
        <ExpeditionData expeditionData={expeditionData} />
        <PieChartSection expedition={expeditionData}/>
      </div>
  );
};

export default StatsBlock;
