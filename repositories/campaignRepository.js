import Campaign from '../models/campaignModel.js';

class CampaignRepository {
  async createCampaign(data) {
    try{
        const campaign = new Campaign(data);
       return await campaign.save();
        
    }
    catch(error){
        console.error("Error in campaignCreation",error.message)
        throw new Error(`Failed to create a campaign: ${error.message}`);
    }
   
  }
  async getAllCampaigns(){
    try {
        const campaigns = await Campaign.find().populate('campaignerDetails');
        return campaigns;
    }
    catch (error) {
        throw new Error("Failed to fetch all donations");
    }
  }
  async getCampaignById(id){
    try{
        const campaign = await Campaign.findById(id).populate("campaignerDetails");
        return campaign;
    }
    catch(error){
        throw new Error("Failed to fetch campaign By Id");
    }
  }
  async getFilteredCampaigns(filters){
    try{
      const {campaignCategory,amountRange,sortField,sortOrder}=filters;
      const query = {}; 
      if(campaignCategory){
        query.campaignCategory = campaignCategory;
      }
      if(amountRange){
        const [min,max] = amountRange.split('-');
        if(max){
          query.targetAmount = {$gte : parseInt(min),$lte:parseInt(max)} //100-200
        }
        else{
          query.targetAmount = {$gte:parseInt(min)};//500+
        }
      }
      const sortOrderValue = sortOrder === "desc" ? -1 : 1;
      return await Campaign.find(query).sort({[sortField]:sortOrderValue})

    }
    catch(error){
      throw new Error ("Failed to fetch the campaigns according to filters")
    }    

  }


}

export default new CampaignRepository();