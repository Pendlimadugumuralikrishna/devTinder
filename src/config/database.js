import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CLUSTER_NAME = process.env.CLUSTER_NAME;

const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER_NAME}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDb;