
import mongoose from 'mongoose';
import campaignSchema from '../schemas/campaignSchema.js';

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign; 