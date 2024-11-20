import React, { useState } from "react";
import { CustomButton } from "../../../../layout/button";
import useExpeditionActions from "../../../../actions/expeditionActions";

const ExpeditionForm = () => {
  const {
    expeditions,
    errorMessage,
    successMessage,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useExpeditionActions();

  const [selectedExpedition, setSelectedExpedition] = useState({
    droneID: "",
    startTime: "",
    endTime: "",
    location: { latitude: "", longitude: "" },
    gasStats: {
      carbonMonoxide: "",
      methane: "",
      butane: "",
      liquefiedPetroleumGas: "",
    },
    feedback: "",
  });

  const handleSelectChange = (event) => {
    const expeditionId = event.target.value;
    const expedition = expeditions.find((exp) => exp._id === expeditionId);
    setSelectedExpedition(
      expedition || {
        droneID: "",
        startTime: "",
        endTime: "",
        location: { latitude: "", longitude: "" },
        gasStats: {
          carbonMonoxide: "",
          methane: "",
          butane: "",
          liquefiedPetroleumGas: "",
        },
        feedback: "",
      }
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedExpedition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGasInputChange = (gasName, value) => {
    setSelectedExpedition((prev) => ({
      ...prev,
      gasStats: {
        ...prev.gasStats,
        [gasName]: value,
      },
    }));
  };

  const handleAddClick = () => handleAdd(selectedExpedition);
  const handleUpdateClick = () => handleUpdate(selectedExpedition);
  const handleDeleteClick = () => handleDelete(selectedExpedition._id);

  return (
    <div>
      <form id="expiForm">
        <div className="expiFormContent">
          <select
            name="Expedition"
            id="expeditionSelect"
            onChange={handleSelectChange}
            value={selectedExpedition._id || ""}
          >
            <option value="">Select an expedition</option>
            {expeditions.map((expedition) => (
              <option key={expedition._id} value={expedition._id}>
                {expedition._id}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter droneID"
            name="droneID"
            value={selectedExpedition.droneID || ""}
            onChange={handleInputChange}
          />
          <input
            type="date"
            placeholder="Enter start time"
            name="startTime"
            value={selectedExpedition.startTime?.split("T")[0] || ""}
            onChange={handleInputChange}
          />
          <input
            type="date"
            placeholder="Enter end time"
            name="endTime"
            value={selectedExpedition.endTime?.split("T")[0] || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Enter latitude"
            name="latitude"
            value={selectedExpedition.location?.latitude || ""}
            onChange={(e) =>
              setSelectedExpedition((prev) => ({
                ...prev,
                location: { ...prev.location, latitude: e.target.value },
              }))
            }
          />
          <input
            type="text"
            placeholder="Enter longitude"
            name="longitude"
            value={selectedExpedition.location?.longitude || ""}
            onChange={(e) =>
              setSelectedExpedition((prev) => ({
                ...prev,
                location: { ...prev.location, longitude: e.target.value },
              }))
            }
          />
          <input
            type="text"
            placeholder="Enter carbon monoxide level"
            name="carbonMonoxide"
            value={selectedExpedition.gasStats?.carbonMonoxide || ""}
            onChange={(e) =>
              handleGasInputChange("carbonMonoxide", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Enter methane"
            name="methane"
            value={selectedExpedition.gasStats?.methane || ""}
            onChange={(e) => handleGasInputChange("methane", e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter butane"
            name="butane"
            value={selectedExpedition.gasStats?.butane || ""}
            onChange={(e) => handleGasInputChange("butane", e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter liquefied petroleum gas"
            name="liquefiedPetroleumGas"
            value={selectedExpedition.gasStats?.liquefiedPetroleumGas || ""}
            onChange={(e) =>
              handleGasInputChange("liquefiedPetroleumGas", e.target.value)
            }
          />
          <div id="expiButtons">
            <CustomButton onClick={handleAddClick}>Add</CustomButton>
            <CustomButton onClick={handleUpdateClick}>Update</CustomButton>
            <CustomButton onClick={handleDeleteClick}>Delete</CustomButton>
          </div>
        </div>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default ExpeditionForm;
