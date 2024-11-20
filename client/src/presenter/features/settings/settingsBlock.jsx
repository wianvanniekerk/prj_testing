import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  fetchUserSettings,
  updateUserDetails,
  updateUserPassword,
} from "../../../domain/api/routes/components/settings";
import SettingsForm from "./components/settingsForm";
import SettingsButtons from "./components/settingsButtons";
import PasswordForm from "./components/passwordForm";

function SettingsBlock() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isUpdateButtonVisible, setIsUpdateButtonVisible] = useState(false);
  const [isPassButtonVisible, setIsPassButtonVisible] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUserSettings();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmailAddress(data.emailAddress);
        setUsername(data.username);
      } catch (error) {
        alert("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  const toggleForm = () => setIsEditFormVisible(!isEditFormVisible);
  const toggleButton = () => setIsUpdateButtonVisible(!isUpdateButtonVisible);
  const toggleButtonPass = () => setIsPassButtonVisible(!isPassButtonVisible);
  const togglePass = () => setIsPassVisible(!isPassVisible);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !emailAddress || !username) {
      alert("Please fill in all fields");
      return;
    }

    const updatedData = { firstName, lastName, emailAddress, username };
    try {
      await updateUserDetails(updatedData);
      setPassword("");
      alert("User updated successfully! Logging you out.");
      handleLogout();
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    if (!password) {
      alert("Password cannot be empty!");
      return;
    }

    try {
      await updateUserPassword(password);
      setPassword("");
      alert("Password updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="settings-block">
      <h1>User details:</h1>
      <SettingsForm
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
        username={username}
        setFirstName={setFirstName} 
        setLastName={setLastName}
        setEmailAddress={setEmailAddress}
        setUsername={setUsername}
        isEditFormVisible={isEditFormVisible}
        handleUpdate={handleUpdate}
        toggleButtonPass={toggleButtonPass}
        togglePass={togglePass}
        isUpdateButtonVisible={isUpdateButtonVisible}
      />

      <PasswordForm
        isPassVisible={isPassVisible}
        isPassButtonVisible={isPassButtonVisible}
        password={password}
        setPassword={setPassword}
        handlePasswordUpdate={handlePasswordUpdate}
      />
      <SettingsButtons
        toggleButton={toggleButton}
        toggleForm={toggleForm}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default SettingsBlock;
