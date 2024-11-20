import Cookies from "js-cookie";

const getAuthToken = () => Cookies.get("accessToken");

export const fetchUserExpeditions = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch("/api/user/expeditions", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch expeditions.");
  return data;
};

export const addExpedition = async (expeditionData) => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch("/api/expeditions/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expeditionData),
  });

  if (!response.ok) throw new Error(response.statusText || "Failed to add expedition.");
};

export const updateExpedition = async (expeditionId, expeditionData) => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch(`/api/expeditions/update/${expeditionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expeditionData),
  });

  if (!response.ok) throw new Error(response.statusText || "Failed to update expedition.");
};

export const deleteExpedition = async (expeditionId) => {
  const token = getAuthToken();
  if (!token) throw new Error("No Authentication token found.");

  const response = await fetch(`/api/expeditions/delete/${expeditionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(response.statusText || "Failed to delete expedition.");
};
