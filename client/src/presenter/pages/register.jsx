import { useEffect, useState } from "react";
import { registerUser } from "../../domain/api/routes/auth/register";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      navigate("/info");
    }
  }, [navigate]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [registerUserMessage, setRegisterUserMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setRegisterUserMessage("");
      return;
    }

    const { success, message } = await registerUser({
      firstName,
      lastName,
      emailAddress,
      username,
      password,
    });

    if (success) {
      setRegisterUserMessage(message);
      setError("");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setError(message);
      setRegisterUserMessage("");
    }
  };

  const handleLoginNavigate = () => {
    window.location.href = "/";
  };

  return (
    <div id="register">
      <div id="pilotHat">
        <img src="/images/airPilotHat.svg" alt="Air Pilot Hat" />
      </div>
      <div id="registerContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            name="emailAddress"
            id="email"
            placeholder="Email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="registerFeedback">{registerUserMessage}</div>
          <div className="registerFeedback error">{error}</div>
          <div id="registerButton">
            <button type="submit">Register</button>
          </div>
          <p>
            Already have an account?
            <span id="registerUser" onClick={handleLoginNavigate}>
              {" "}
              Login
            </span>
          </p>
        </form> 
      </div>
    </div>
  );
}

export default Register;
