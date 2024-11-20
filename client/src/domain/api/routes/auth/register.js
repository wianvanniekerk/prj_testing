export async function registerUser({
  firstName,
  lastName,
  emailAddress,
  username,
  password,
}) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    return { success: true, message: "Registered successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
