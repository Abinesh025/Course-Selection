import express from "express";
import {getUser,getLogin} from "../Controllers/userController.js";
const userRouter = express.Router();

userRouter.route("/signup").post(getUser);
userRouter.route("/login").post(getLogin);

export default userRouter;