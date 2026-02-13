import jsonwebtoken from "jsonwebtoken"
export const getCookies = async(userId,res)=>{
    try{
        const token = jsonwebtoken.sign({userId},process.env.COOKIE_KEY,{
            expiresIn:"15D"
        })

        res.cookie("JWT",token,{
            httpOnly:true,
            sameSystem:true,
            maxAge:15*24*60*1000
        });
    }
    catch(error)
    {
        return  res.status(500).json({success:false,message:"Internal Server Error"});
    }
}