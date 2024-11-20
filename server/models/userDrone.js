import mongoose from "mongoose";

const userDroneSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  droneID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    required: true,
  },
});

const UserDrone = mongoose.model("UserDrone", userDroneSchema);
export default UserDrone;
