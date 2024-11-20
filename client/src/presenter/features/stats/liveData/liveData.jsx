import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSensorData } from "../../../../domain/api/routes/components/liveData";
import LiveDataCard from "./components/liveDataCard";

const LiveData = () => {
  const [sensorData, setSensorData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSensorData();
        setSensorData(data.Analog || null); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setLoading(false); 
      }
    };

    getData();
    const intervalId = setInterval(getData, 500);
    return () => clearInterval(intervalId); 
  }, []);

  let finalData = "";
  if (loading) {
    finalData = "Waiting for data...";
  } else if (sensorData === null) {
    finalData = "No data available";
  } else if (sensorData < 3500) {
    finalData = "🟩Levels are normal🟩";
  } else {
    finalData = "🟥GAS DETECTED!!!🟥";
  }

  return (
    <div className="statsInnerLeft">
      <Box sx={{ minWidth: 250 }}>
        <Card variant="outlined" sx={{ p: 20 }}>
          <LiveDataCard
            title="Live Data:"
            description={`Gas Sensor Value: ${sensorData || "N/A"} ${finalData}`}
          />
        </Card>
      </Box>
    </div>
  );
};

export default LiveData;
