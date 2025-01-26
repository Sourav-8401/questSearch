import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async ()=>{
   try {
      console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log("MONGODB CONNECTION SUCCESSFUL: DB_HOST ",connectionInstance.connection.host);
   } catch (error) {
      console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log("MONGODB CONNECTION ERROR :", error);
   }
}

export default connectDB