import Cookies from "js-cookie";

const getAuthToken = () => Cookies.get("accessToken");

export const fetchAllDrones = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch("/api/stats/allDrones", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch drones.");
  return data;
};

export const fetchLatestID = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch("/api/stats/latestNum", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch latest ID.");
  return parseInt(data.latest) + 1;
};

export const addDrone = async (droneData) => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch("/api/stats/addDrone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(droneData),
  });

  if (!response.ok) throw new Error(response.statusText || "Failed to add drone.");
};

export const updateDrone = async (droneId, droneData) => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch(`/api/stats/updateDrone/${droneId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(droneData),
  });

  if (!response.ok) throw new Error(response.statusText || "Failed to update drone.");
};

export const deleteDrone = async (droneId, droneNum) => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch(`/api/stats/deleteDrone/${droneId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ droneNum }),
  });

  if (!response.ok) throw new Error(response.statusText || "Failed to delete drone.");
};
