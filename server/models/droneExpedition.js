import mongoose from "mongoose";

const droneExpeditionSchema = new mongoose.Schema({
  droneID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    required: true,
  },
  expeditionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expedition",
    required: true,
  },
});

const DroneExpedition = mongoose.model(
  "DroneExpedition",
  droneExpeditionSchema
);
export default DroneExpedition;
