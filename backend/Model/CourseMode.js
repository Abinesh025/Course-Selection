import mongoose, { Mongoose } from "mongoose";

const courseSchema = new mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    img:{
        type:String
    }
    ,Language:[
        {
            type:String,
            enum:["English","Tamil","Hindi"]
        }
    ],
    ratings:{
        type:Number,
        default:0.0
    },
    enrollemnt:{
        type:Number,
        default:0
    },
    amount:{
        type:Number,
        default:500.00
    },
    level:{
        type:String,
        enum:["Begginer","Intermediate","Advanced"]
    },
    category:{
        type:String,
        enum:["Programming","Design","Marketing","Language"]
    }
},{timestamps:true});

const courseModel = mongoose.model("Course",courseSchema);

export default courseModel;