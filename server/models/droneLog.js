import mongoose from "mongoose";

const droneLogSchema = new mongoose.Schema({
  droneID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  gasStats: [
    {
      detectionStatus: { type: String, required: true },
      detectionValue: { type: Number, required: true },
    },
  ],
  route: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      altitude: { type: Number, required: true },
    },
  ],
});

const DroneLog = mongoose.model("DroneLog", droneLogSchema);
export default DroneLog;
