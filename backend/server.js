import express from "express";
const app = express();
import dotenv from "dotenv";
import getDataBase from "./Config/db.js";

dotenv.config()




// Server Running Port
app.listen(process.env.PORT,()=>{
    console.log("The server is Connected on" +" "+ process.env.PORT);
    getDataBase();
});