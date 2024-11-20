import express from "express";
import isAuthenticated from "../../../middleware/auth.js";
import {
  addExpedition,
  deleteExpedition,
  getUserExpeditions,
  updateExpedition,
} from "../../controller/components/expeditionController.js";

const expeditionRouter = express.Router();

expeditionRouter.get("/user/expeditions", isAuthenticated, getUserExpeditions);
expeditionRouter.post("/expeditions/add", isAuthenticated, addExpedition);
expeditionRouter.put(
  "/expeditions/update/:expeditionID",
  isAuthenticated,
  updateExpedition
);
expeditionRouter.delete("/expeditions/delete/:expeditionID", isAuthenticated, deleteExpedition);
export default expeditionRouter;
