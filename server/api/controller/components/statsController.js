import UserDrone from "../../../models/userDrone.js";
import Drone from "../../../models/drone.js";
import DroneExpedition from "../../../models/droneExpedition.js";
import Expedition from "../../../models/expedition.js";

export const getDroneStats = async (req, res) => {
  const userId = req.user.id;
  const droneID = req.params.droneID;

  try {
    const accessRecord = await UserDrone.findOne({ userID: userId, droneID: droneID });
    if (!accessRecord) {
      return res.status(403).json({ message: "Access denied: user does not have access to this drone." });
    }

    const droneStats = await Drone.findOne({ _id: droneID });
    if (!droneStats) {
      return res.status(404).json({ message: "Drone stats not found" });
    }

    const droneExpeditions = await DroneExpedition.find({ droneID });
    const expeditionIDs = droneExpeditions.map(de => de.expeditionID);
    const expeditionData = await Expedition.find({ _id: { $in: expeditionIDs } });

    res.status(200).json({ droneStats, expeditionData });
  } catch (error) {
    console.error("Error fetching drone stats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
export const getAllDrones = async (req, res) => {
  try {
    const userId = req.user.id;
    const drones = await UserDrone.find({ userID: userId }).populate('droneID');
    res.status(200).json(drones);
  } catch (err) {
    console.error("Error fetching all drones:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getLatestDroneID = async (req, res) => {
  try {
    const latestDrone = await Drone.findOne().sort({ droneNum: -1 }).exec(); //sort in descending order -1, so the max drone num will be on top.
    const latest = latestDrone ? latestDrone.droneNum : 0; //checks whether or not latestDrone has something, if not set to 0
    res.status(200).json({ latest });
  } catch (err) {
    console.error("Error fetching latest drone ID:", err);
    return res.status(500).json({ message: "Internal server error",err });
  }
}

export const addNewDrone = async (req, res) => {
  try {
    const userID = req.user.id;
    const { droneNum, droneType, flightHours } = req.body;
    const newDrone = new Drone({ droneNum, droneType, flightHours });
    const savedDrone = await newDrone.save(); //Save the new drone and get its saved document

    const newUserDrone = new UserDrone({
      userID,
      droneID: savedDrone._id, //Use the _id from the saved drone
    });
    await newUserDrone.save();

    res.status(201).json({ message: "Drone added successfully" });
  } catch (err) {
    console.error("Error adding new drone:", err);
    return res.status(500).json({ message: "Problem adding new Drone" });
  }
};



export const updateDrone = async (req, res) => {
  try {
    const { droneID } = req.params;
    const { droneType, flightHours } = req.body;
    const updateDrone = await Drone.findByIdAndUpdate(droneID, { droneType, flightHours }, { new: true });

    if (!updateDrone) {
      return res.status(404).json({ message: "Drone not Found" });
    }

    res.status(200).json(updateDrone);
  } catch (err) {
    console.error("Error updating drone:", err);
    res.status(500).json({ message: "Error updating drone." });
  }
};

export const deleteDrone = async (req, res) => {
  try {
    const { droneID } = req.params;
    const deleteDrone = await Drone.findByIdAndDelete(droneID);
    const deleteUserDrone = await UserDrone.findOneAndDelete({ droneID });

    if (!deleteDrone || !deleteUserDrone) {
      return res.status(404).json({ message: "Drone not Found" });
    }

    res.status(200).json({ message: "Drone deleted successfully" });
  } catch (err) {
    console.error("Error deleting drone:", err);
    res.status(500).json({ message: "Error deleting drone." });
  }
};

