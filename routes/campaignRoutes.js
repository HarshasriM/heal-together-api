import express from "express";
import campaignController from "../controllers/campaignController.js";
const router = express.Router();

router.post('/', campaignController.createCampaign);
router.get('/all', campaignController.getAll);
router.get("/filter",campaignController.getFilterdCampaigns);
router.get("/:id",campaignController.getById);

export default router;