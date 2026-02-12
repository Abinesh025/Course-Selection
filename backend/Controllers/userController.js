import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

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