import Donation from "../models/donationModel.js";
import User from "../models/userModel.js"
import mongoose from "mongoose";

class DonationRepository {
    async createDonation(data) {
        try {
            if (!mongoose.Types.ObjectId.isValid(data.donarId)) {
                throw new Error('Invalid donarId format');
            }
            if (!mongoose.Types.ObjectId.isValid(data.campaignId)) {
                throw new Error('Invalid campaignId format');
            }
           
            const donation = new Donation(data);
            const savedDonation = await donation.save();

            // Update the donor's donations array
            const updatedDonor = await User.findByIdAndUpdate(
                data.donarId,
                { $push: { donations: savedDonation._id } },
                { new: true } // Return the updated document
            );

            if (!updatedDonor) {
                throw new Error("Failed to update the donor's donations array. Donor not found.");
            }

            return savedDonation;
        }
        catch (error) {
            console.error("Error in createDonation:", error.message);

            // Throw a user-friendly error
            throw new Error(`Failed to create a donation: ${error.message}`);
        }

    }
    async getAllDonations() {
        try {
            const donations = await Donation.find().populate('donarId',"username email");
            return donations;
        }
        catch (error) {
            throw new Error("Failed to fetch all donations");
        }
    }
    async getDonationBycampaignId(campaignId) {
        if (!mongoose.Types.ObjectId.isValid(campaignId)) {
            throw new Error("Invalid ID format");
        }
        try {
            const donation = await Donation.find({ campaignId }).populate('donarId', 'username email');
            return donation;
        }
        catch (error) {
            throw new Error("Failed to fetch the required donation");
        }
    }
    async getDonationBydonarId(donarId) {
        if (!mongoose.Types.ObjectId.isValid(donarId)) {
            throw new Error("Invalid ID format");
        }
        try {
            const donation = await Donation.find({ donarId });
            return donation;
        }
        catch (error) {
            throw new Error("Failed to fetch the required donation");
        }
    }
}
export default new DonationRepository;