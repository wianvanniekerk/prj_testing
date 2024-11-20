import Cookies from "js-cookie";

const fetchDroneData = async (droneID) => {
  if (!droneID) throw new Error("droneID is required");

  const response = await fetch(`/api/stats/drones/${droneID}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Failed to fetch data: ${response.status} ${errorDetails}`);
  }

  return await response.json();
};

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

export default fetchDroneData;
