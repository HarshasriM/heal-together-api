import Donation from "../models/donationModel.js";
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
            return await donation.save();
        }
        catch (error) {
            throw new Error("Failed to create a donation");
        }

    }
    async getAllDonations() {
        try {
            const donations = await Donation.find().populate('donarId');
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