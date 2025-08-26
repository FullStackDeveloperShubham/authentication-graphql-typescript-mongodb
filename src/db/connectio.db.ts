import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

type URL = string | undefined;
const url: URL = process.env.MONGOD_URL

// ! Define the connection method 
const connectionDB = async () => {
  try {
    await mongoose.connect(url!);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecet to database", error.message);
    process.exit(1);
  }
}
export default connectionDB;