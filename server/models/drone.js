import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const droneSchema = new mongoose.Schema({
    droneNum: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    droneType: { type: String, required: true },
    flightHours: {type: Number, required: false}
});

const Drone = mongoose.model("Drone", droneSchema);
export default Drone;