import jsonwebtoken from "jsonwebtoken";
import User from "../Model/UserModel.js";

export const getToken = async(req,res,next)=>{
    try{
        const token = req.cookies.JWT;

        if(!token){
            return res.status(404).json({success:false,message:"You need to Login"});
        }
        const decode = jsonwebtoken.verify(token,process.env.COOKIE_KEY);

        if(!decode){
            return res.status(404).json({success:false,message:"You Don't Have Access"});
        }

        const user = await User.findById({_id:decode.userId}).select("-password");

        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"});
        }

        req.user = user;
        next();
    }catch(error){
        return res.status(500).json({success:false,message:"Internal Server Error in Authorization"});
    }
} 