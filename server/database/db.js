import mongoose from "mongoose";

Connection().catch((err)=>{ console.log("Error while connecting database",err) })

async function Connection()
{
    const URL = 'mongodb://127.0.0.1:27017/meal-tracker';
    await mongoose.connect(URL);
    console.log("Database is connected");
}

export default Connection;
