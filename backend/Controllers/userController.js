import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import { getCookies } from "../Utils/Cookies.js";


// /api/v1/signin
export const getUser = async(req,res)=>{
    try
    {
        const {name,email,password} = req.body;
        const user = await User.findOne({name});

        if(user){
            return res.status(409).json({success:false,message:"User is Already Exists"});
        }

        // Email Verify
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const verifyEmail = emailRegex.test(email);
        if(!verifyEmail){
            return res.status(404).json({success:false,message:"PLease Enter a Valid Email"});
        }

        // Passsword Verify

        if(!(password.length) > 6){
            return res.status(404).json({success:false,message:"Password Must have 6 Characters"});
        }

        const passwordCheck =await bcrypt.genSalt(12);
        const hashPassword =await bcrypt.hash(password,passwordCheck);
        

        const details = new User({
            name,
            email,
            password:hashPassword
        })

        await details.save();

        return res.status(200).json({success:true,details});
        
    }
    catch(error)
    {
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

// /api/v1/login
export const getLogin = async(req,res)=>{
    try{
        const {name,password} = req.body;
        const user = await User.findOne({name});

        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"});
        }

        const passwordVerify = await bcrypt.compare(password,user.password || "");

        if(!passwordVerify){
            return res.status(400).json({success:false,message:"Invalid Password"});
        }

        if(user){
            getCookies(user._id,res);
            res.status(200).json({success:true,user});
        }
    }
    catch(error){
        return res.status(500).json({success:false,message:`Internall Server Error ${error.message}`});
    }
}

// /api/v1/logout
export const getLogOut = async(req,res)=>{
    
    return res.cookie("JWT",null,{
        maxAge:new Date(Date.now()),
        httpOnly:true,
    }).json({success:true,message:"Logout SuccessFully"});
}

// /api/v1/profile
export const getCurrentUser = async(req,res)=>{
    try{
        const user = await User.findById({_id:req.user._id});

        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"});
        }

        return res.status(200).json({success:true,user});
    }catch(error){
        return res.status(500).json({success:false,message:"Internal Server Error in Profile"});
    }
}