import React from "react";
import { CustomButton } from "../../../layout/button";

function SettingsButtons({ toggleButton, toggleForm, handleLogout }) {
  return (
    <div id="updateButton">
      <CustomButton
        id="change"
        onClick={() => {
          toggleButton();
          toggleForm();
        }}
      >
        Change Details
      </CustomButton>

      <CustomButton  onClick={handleLogout}>
        Log Out
      </CustomButton>
    </div>
  );
}

export default SettingsButtons;
