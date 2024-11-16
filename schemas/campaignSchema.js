const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    campaignTitle: { type: String, required: true },
    campaignCategory: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    collectedAmount: { type: Number, default:0 },
    campaignDescription: { type: String, required: true },
    deadline: { type: Date, required: true },
    campaignerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' collection
        required: true,
    },
    patientDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        patientAge: { type: Number, required: true },
        patientDisease: { type: String, required: true },
        hospitalName: { type: String, required: true },
        relationToPatient: { type: String, required: true },
        isPatientAdmitted: { type: Boolean, required: true }
    },
    bankDetails: {
        accountHolderName: { type: String, required: true },
        accountType: { type: String, required: true },
        bankName: { type: String, required: true },
        bankBranch: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        upiId: { type: String, required: true }
    },
    additionalInformation: {
        supportingDocs: [String],
        campaignImage: { type: String, required: true },
        socialMediaLinks:  [String],
    }
}, { timestamps: true });


export default campaignSchema;
