export async function fetchSensorData() {
    const response = await fetch("/api/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
   
    if (!response.ok) {
      throw new Error("Failed to fetch sensor data");
    }
   
    const data = await response.json();
    return data;
  }
   