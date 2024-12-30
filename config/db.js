import { connect } from "mongoose";

import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.join(__dirname, "../", ".env"),
});
const MONGODB_URI=process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await connect(MONGODB_URI)
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;