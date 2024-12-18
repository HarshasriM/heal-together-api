import campaignRepository from "../repositories/campaignRepository.js";

class campaignService{
    async createCampaign(data) {
        try{
            return await campaignRepository.createCampaign(data);
        }
        catch(err){
            throw new Error("Donation has not created some error in service")
        }
       
    }
    async getAllCampaigns() {
        try{
            return await campaignRepository.getAllCampaigns();
        }
        catch(err){
            throw new Error("campaigns has not retrieved some error in service")
        }
       
    }
    async getCampaignById(id){
        try{
            return await campaignRepository.getCampaignById(id);
        }
        catch(err){
            throw new Error("Campign has not retrived By Id in service")
        }
    }
    async getFilteredCampaigns(filters){
        try{
            const campaigns = await campaignRepository.getFilteredCampaigns(filters);
            return campaigns;

        }
        catch(error){
            console.error("Error in fetchimg filtered campaigns",error.message);
            throw new Error('Failed to fetch filtered Campaigns')
        }
    }
}
export default new campaignService();