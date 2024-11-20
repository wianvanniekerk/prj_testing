import express from "express";
import isAuthenticated from "../../../middleware/auth.js";
import { getDroneStats, getAllDrones, getLatestDroneID, addNewDrone, updateDrone, deleteDrone } from "../../controller/components/statsController.js";

const statsRouter = express.Router();

statsRouter.get("/stats/drones/:droneID", isAuthenticated, getDroneStats);
statsRouter.get("/stats/allDrones", isAuthenticated, getAllDrones);
statsRouter.get("/stats/latestNum", isAuthenticated, getLatestDroneID);
statsRouter.post("/stats/addDrone", isAuthenticated, addNewDrone);
statsRouter.put("/stats/updateDrone/:droneID", isAuthenticated, updateDrone); // Update route
statsRouter.delete("/stats/deleteDrone/:droneID", isAuthenticated, deleteDrone); // Delete route

export default statsRouter;
