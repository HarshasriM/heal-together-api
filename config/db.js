import { connect } from "mongoose";
const MONGODB_URI="mongodb://localhost:27017/healtogether"
const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;