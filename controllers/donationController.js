import donationService from '../services/donationService.js';
import mongoose from 'mongoose';
class DonationController {
    async createDonation(req, res) {
        try {
            const { amount, type,campaignId,donarId,transactionId } = req.body;
            if (!mongoose.Types.ObjectId.isValid(donarId) || !mongoose.Types.ObjectId.isValid(campaignId)) {
                throw new Error("Invalid donorId or campaignId");
            }
            const tempdonation = {
                amount: amount,
                type: type,
                campaignId: new mongoose.Types.ObjectId(campaignId),
                donarId: new mongoose.Types.ObjectId(donarId),
                transactionId:transactionId,
            }
            if (!amount || !type) {
                return res.status(400).json({ message: 'Amount and type fields  are required' });
            }
            if (type === "card") {
                const { cardNumber, cardHolderName, cvv, expiryDate } = req.body;
                if (!cardNumber || !cardHolderName || !cvv || !expiryDate) {
                    return res.status(400).json({ message: 'card fields  are required' });
                }
                const cardDetails = {
                    cardNumber: cardNumber,
                    cardHolderName: cardHolderName,
                    cvv: cvv,
                    expiryDate: expiryDate
                }
                tempdonation.cardDetails = cardDetails;
                console.log(tempdonation)
            }
            else {
                const { upiId } = req.body;
                if (!upiId) {
                    return res.status(400).json({ message: "Upi Id is required" })
                }
                const upiDetails = {
                    upiId: upiId,
                }
                tempdonation.upiDetails = upiDetails;
                
            }
            const donation = await donationService.createDonation(tempdonation);
            return res.status(201).json({
                success: true,
                data: donation,
                message: 'Donation created successfully',
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                data: {},
                message: 'Failed to create donation',
                err: err.message,
            });
        }

    }
    async getAll(req, res) {
        try {
            const donations = await donationService.getAllDonations();
            return res.status(200).json({
                success: true,
                data: donations,
                message: 'Donations retrieved successfully',
            });
        }

        catch (err) {
            return res.status(500).json({
                success: false,
                data: {},
                message: 'Failed to retrieve donations',
                err: err.message,
            });
        }
    }
    async getDonationsByDonar(req,res){
        try{
            const {donarId} = req.params;
            const donations = await donationService.getDonationsByDonorId(donarId);
            return res.status(200).json({
                success:true,
                data :donations,
                message:"successfully retrieved all donations",
            })
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                data :{},
                message:"Error while retrieving all donations by donarId",
            })
        }
    }
    async getDonationsByCampaign(req,res){
        try{
            const {campaignId} = req.params;
            const donations = await donationService.getDonationsByCampaignId(campaignId);
            return res.status(200).json({
                success:true,
                data :donations,
                message:"successfully retrieved all donations",
            })
        }
        catch(err){
            return res.status(500).json({
                success:false,
                data :{},
                message:"Error while retrieving all donations By campaignId",
            })
        }
    }
}

export default new DonationController();