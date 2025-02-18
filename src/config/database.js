import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CLUSTER_NAME = process.env.CLUSTER_NAME;
console.log(USERNAME, PASSWORD, DB_NAME, CLUSTER_NAME);

const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb+srv://pmmike2106:${PASSWORD}@cluster0.qwdyt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
   
  }
};

export default connectDb;