import UserDrone from "../../../models/userDrone.js";
import DroneExpedition from "../../../models/droneExpedition.js";
import Expedition from "../../../models/expedition.js";

export const getUserExpeditions = async (req, res) => {
  const userId = req.user.id; 
  try {
    const userDrones = await UserDrone.find({ userID: userId }).select("droneID");
    if (!userDrones.length) {
      return res.status(404).json({ message: "No drones found for this user." });
    }

    const droneIDs = userDrones.map((userDrone) => userDrone.droneID);

    const droneExpeditions = await DroneExpedition.find({ droneID: { $in: droneIDs } });
    const expeditionIDs = droneExpeditions.map((de) => de.expeditionID);

    if (!expeditionIDs.length) {
      return res.status(404).json({ message: "No expeditions found for this user's drones." });
    }

    const expeditionData = await Expedition.find({ _id: { $in: expeditionIDs } });

    res.status(200).json(expeditionData);
  } catch (error) {
    console.error("Error fetching expeditions for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addExpedition = async (req, res) => {
  const userId = req.user.id;

  try {
    const { 
      droneID, 
      startTime, 
      endTime, 
      location: { latitude, longitude }, 
      gasStats: { carbonMonoxide, methane, butane, liquefiedPetroleumGas } 
    } = req.body;

    if (!droneID || !startTime || !endTime || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newExpedition = new Expedition({
      userID: userId,
      droneID,
      startTime,
      endTime,
      location: { latitude, longitude },
      gasStats: { carbonMonoxide, methane, butane, liquefiedPetroleumGas },
    });

    const savedExpedition = await newExpedition.save();

    const newDroneExpedition = new DroneExpedition({
      droneID,
      expeditionID: savedExpedition._id,
    });

    await newDroneExpedition.save();

    res.status(201).json({ message: "Expedition added successfully.", expedition: savedExpedition });
  } catch (error) {
    console.error("Error adding expedition:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const updateExpedition = async (req, res) => {
  const { expeditionID } = req.params;
  const updateData = req.body; 

  try {
    const updatedExpedition = await Expedition.findByIdAndUpdate(
      expeditionID,
      updateData,
      { new: true, runValidators: true } 
    );

    if (!updatedExpedition) {
      return res.status(404).json({ message: "Expedition not found." });
    }
    res.status(200).json({ message: "Expedition updated successfully.", expedition: updatedExpedition });
  } catch (error) {
    console.error("Error updating expedition:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteExpedition = async (req, res) => {
  try {
    const { expeditionID } = req.params;
    const deleteExpedition = await Expedition.findByIdAndDelete(expeditionID);
    const deleteDroneExpedition = await DroneExpedition.findOneAndDelete({expeditionID});

    if(!deleteExpedition || !deleteDroneExpedition) {
      return res.status(404).json({message: "Expedition not found"});
    } 
    res.status(200).json({message: "Expedition deleted successfully"});
  } catch (error) {
     console.error("Error deleting expedition:", err);
    res.status(500).json({ message: "Error deleting expedition."});
  } 
}


