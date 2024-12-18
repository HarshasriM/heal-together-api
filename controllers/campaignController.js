import campaignService from "../services/campaignService.js";

class campaignController{
    async createCampaign(req,res){
        try {
            const campaign = await campaignService.createCampaign(req.body);
        
            res.status(201).json({
              success: true,
              message: 'Campaign created successfully',
              data: campaign,
            });
          } catch (error) {
            console.error('Error creating campaign:', error);
            res.status(500).json({
              success: false,
              data:{},
              message: 'Failed to create campaign',
              error: error.message,
            });
          }
    }
    async getAll(req,res){
        try {
            const campaigns = await campaignService.getAllCampaigns();
            return res.status(200).json({
                success: true,
                data: campaigns,
                message: 'campaigns retrieved successfully',
            });
        }

        catch (err) {
            return res.status(500).json({
                success: false,
                data: {},
                message: 'Failed to retrieve campaigns',
                err: err.message,
            });
      
        }
    }
    async getById(req,res){
        try{
            const {id} = req.params;
            const campaign = await campaignService.getCampaignById(id);
                return res.status(200).json({
                    success:true,
                    data :campaign,
                    message:"successfully retrieved campaign By Id",
                })
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                data :{},
                message:"Error while retrieving  campaign by donarId",
            })
        }
        
    }
    async getFilterdCampaigns(req,res){
        try{
            const {campaignCategory,amountRange,sortField,sortOrder} = req.query;
            const filters= {
                campaignCategory,
                amountRange,
                sortField:sortField || "targetAmount",
                sortOrder:sortOrder || "asc",
            };
            const campaigns = await campaignService.getFilteredCampaigns(filters);
            res.status(200).json({
                success : true,
                data : campaigns,
                message : "Filtered campaigns fetched successfully",
            });
        }
        catch(error){
            console.error("Error in fetching filtered campaigns",error.message);
            res.status(500).json({
                success:false,
                message:"Failed to fetch Filterd Campaigns",
                data:{},
                error:error.message,
            });
        }
        
    }
}
export default new campaignController();