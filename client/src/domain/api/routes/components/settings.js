import Cookies from "js-cookie";

export async function fetchUserSettings() {
  const token = Cookies.get("accessToken");

  const response = await fetch("/api/settings/getUser", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  return data;
}

export async function updateUserDetails(updatedData) {
  const token = Cookies.get("accessToken");

  const response = await fetch("/api/settings/updateUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const data = await response.json();
  return data;
}

export async function updateUserPassword(password) {
  const token = Cookies.get("accessToken");

  const response = await fetch("/api/settings/updateUserPassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error("Failed to update password");
  }

  const data = await response.json();
  return data;
}
