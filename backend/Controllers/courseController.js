import Course from "../Model/CourseMode.js";

// /api/v2/courses
export const createCourse = async(req,res)=>{
    try{
        const {coursename,description,category,amount} = req.body;

        if(!coursename||!description||!category||!amount){
            return res.status(400).json({success:false,message:"Must Enter the Fields"});
        }

        if(amount < 0){
            return res.status(400).json({success:false,message:"Enter a Valid Amount"});
        }

        const courses = new Course({
            coursename,
            description,
            category,
            amount
        });

        await courses.save();

        return res.status(200).json({success:true,courses});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error in courses"});
    }
}

// /api/v2/allcourses
export const getCourse = async(req,res)=>{
    try{
        const courses = await Course.find();

        if(!courses){
            return res.status(400).json({success:false,message:"Course Data Not Found"});
        }
        return res.status(200).json({success:true,couses:courses.length,courses});
    }
    catch(error){
        return res.status(500).json({success:false,message:"Internal Server Error in All Courses"});
    }
}