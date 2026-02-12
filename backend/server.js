import express from "express";
const app = express();
import dotenv from "dotenv";
import getDataBase from "./Config/db.js";
import userRouter from "./Routes/user.js"
import cookieParser from "cookie-parser";

// Provide Access
dotenv.config()
app.use(cookieParser());
app.use(express.json({limit:"5mb"}));


// Routes
app.use("/api/v1",userRouter);


// Server Running Port
app.listen(process.env.PORT,()=>{
    console.log("The server is Connected on" +" "+ process.env.PORT);
    getDataBase();
});