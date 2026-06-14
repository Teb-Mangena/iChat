import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDb() {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting to DB", error.message);
    process.exit(1);
  }
}
