import mongoose from "mongoose";
import donationSchema from "../schemas/donationSchema";

const Donation = mongoose.model("Donation",donationSchema)

module.exports = Donation;