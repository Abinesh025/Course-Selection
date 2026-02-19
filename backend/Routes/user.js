import express from "express";
import {getUser,getLogin, getLogOut, getCurrentUser} from "../Controllers/userController.js";
import { getCookies } from "../Utils/Cookies.js";
import { getToken } from "../Utils/Auth.js";
const userRouter = express.Router();

userRouter.route("/signup").post(getUser);
userRouter.route("/login").post(getLogin);
userRouter.route("/logout").get(getLogOut);

// Role Based Access

userRouter.route("/profile").get(getToken,getCurrentUser);

export default userRouter;