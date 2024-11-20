import { useEffect, useState } from "react"; 
import fetchDroneData from "../../domain/api/routes/components/stats";

const useFetchDroneData = (droneID) => {
  const [droneData, setDroneData] = useState({});
  const [expeditionData, setExpeditionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDroneData(droneID);
        setDroneData(data);

        if (data.expeditionData && data.expeditionData.length > 0) {
          setExpeditionData(data.expeditionData);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching drone data:", error);
      }
    };

    fetchData();
  }, [droneID]);

  return { droneData, expeditionData, error };
};

export default useFetchDroneData;
