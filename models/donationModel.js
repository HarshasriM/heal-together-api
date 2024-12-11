import mongoose from "mongoose";
import donationSchema from "../schemas/donationSchema.js";

const Donation = mongoose.model("Donation",donationSchema)

export default Donation;