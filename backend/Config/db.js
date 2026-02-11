import mongoose from "mongoose";

 const getDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
            console.log("MongoDb is Connected ");
        
    }catch(error){
        console.log(`${error.message}`);
    }
}

export default getDatabase
