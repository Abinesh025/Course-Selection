import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        name:{
            type:String,
            unique:true,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        mycourses:[{
            type:String,
        }],
        password:{
            type:String,
            required:true
        },
        profile:{
            type:String,
            default:""
        },
        addToCart:[{
            type:String,
        }]
});

const userModel = new mongoose.model("users",userSchema);

export default userModel;