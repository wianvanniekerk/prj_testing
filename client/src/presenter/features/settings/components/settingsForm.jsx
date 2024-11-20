import React from "react";

function SettingsForm({
  firstName,
  lastName,
  emailAddress,
  username,
  setFirstName,
  setLastName,
  setEmailAddress,
  setUsername,
  isEditFormVisible,
  handleUpdate,
  toggleButtonPass,
  togglePass,
  isUpdateButtonVisible,
}) {
  return (
    <div className="settings-form">
      <div id="top">
        <div id="settingsInput">
          <input type="text" name="firstName" value={firstName} readOnly />
          <input type="text" name="lastName" value={lastName} readOnly />
          <input
            type="email"
            name="emailAddress"
            value={emailAddress}
            readOnly
          />
          <input type="text" name="username" value={username} readOnly />
        </div>
        <form onSubmit={handleUpdate}>
          <div
            id="editForm"
            className={`${isEditFormVisible ? "show" : "hide"} updateForm`}
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              name="emailAddress"
              placeholder="Email address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <button
              type="button"
              id="changePass"
              onClick={() => {
                toggleButtonPass();
                togglePass();
              }}
              className="button"
            >
              Change Password
            </button>
          </div>
          <button
            type="submit"
            id="update"
            className={`${isUpdateButtonVisible ? "show" : "hide"} button`}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsForm;
