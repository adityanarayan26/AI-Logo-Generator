import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};