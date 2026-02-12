import express from "express";
import {getUser} from "../Controllers/userController.js";
const userRouter = express.Router();

userRouter.route("/signup").post(getUser);

export default userRouter;