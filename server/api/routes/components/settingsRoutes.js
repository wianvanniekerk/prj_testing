import express from "express";
import isAuthenticated from "../../../middleware/auth.js";
import { getUser, updateUser, updateUserPassword } from "../../controller/components/settingsController.js";


const settingsRouter = express.Router();

settingsRouter.put("/settings/updateUser", isAuthenticated, updateUser);
settingsRouter.put("/settings/updateUserPassword", isAuthenticated, updateUserPassword);
settingsRouter.get("/settings/getUser", isAuthenticated, getUser);

export default settingsRouter;
