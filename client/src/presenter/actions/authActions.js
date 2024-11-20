import Cookies from "js-cookie";
import { login } from "../../domain/api/routes/auth/login.js";

export const loginUser = async (username, password, setIsLoading) => {
  try {
    const data = await login(username, password);

    if (data.accessToken) {
      const accessToken = data.accessToken;
      Cookies.set("accessToken", accessToken, {
        expires: 1,
        sameSite: "None",
        secure: true,
      });

      setTimeout(() => {
        window.location.href = "/info";
      }, 2000);
    } else {
      setError(data.message);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  } catch (error) {
    console.error("Error:", error);
    setError("An error occurred. Please try again.");
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  localStorage.setItem("username", username);
};
