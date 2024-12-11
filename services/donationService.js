import donationRepository from "../repositories/donationRepository.js";

class DonationService {
    async createDonation(data) {
        try{
            return await donationRepository.createDonation(data);
        }
        catch(err){
            throw new Error("Donation has not created some error in service")
        }
       
    }
    async getAllDonations(){
        try{
            return await donationRepository.getAllDonations();
        }
        catch(err){
            throw new Error("Can't retrieve all donations in service");
        }
    }
    async getDonationsByDonorId(donarId){
        try{
            return await donationRepository.getDonationBydonarId(donarId);
        }
        catch(err){
            throw new Error("Can't retrieve all Donations by donarId");
        }
    }
    async getDonationsByCampaignId(campaignId){
        try{
            return await donationRepository.getDonationBycampaignId(campaignId);
        }
        catch(error){
            throw new Error("Can't retrieve all Donations by campaignId");
        }
    }
}

export default new DonationService();