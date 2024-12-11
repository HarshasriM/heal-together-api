
import mongoose from 'mongoose';
import campaignSchema from '../schemas/campaignSchema';

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign; 