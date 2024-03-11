import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.DB_URL

const mongoDbConnect = async() =>{
  try {
    let connectDB = await mongoose.connect(URL)
   console.log('DB Connected successfully!!');
   return connectDB;

    
  } catch (error) {
    console.log('Error in DB connection',error)
  }
  
}

export default mongoDbConnect;
