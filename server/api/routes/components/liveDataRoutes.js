import express from "express";
import { handleAnalogData, getAnalogData } from "../../controller/components/liveDataController.js";
 
const liveDataRouter = express.Router();
 
// POST route to receive data from the ESP32
liveDataRouter.post("/data", handleAnalogData);
 
// GET route for the front-end to retrieve the latest analog data
liveDataRouter.get("/data", getAnalogData);
 
export default liveDataRouter;