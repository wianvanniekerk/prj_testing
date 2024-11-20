import express from "express";
import { loginUser } from "../../controller/auth/loginController.js";


const loginRouter = express.Router();

loginRouter.post("/login", loginUser);

export default loginRouter;
