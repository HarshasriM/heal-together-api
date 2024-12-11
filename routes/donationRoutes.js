import express from "express";
import donationController from "../controllers/donationController.js"

const router = express.Router();


router.post('/', donationController.createDonation);
router.get('/all', donationController.getAll);
router.get('/donar/:donarId', donationController.getDonationsByDonar);
router.get('/campaign/:campaignId', donationController.getDonationsByCampaign);

export default router;