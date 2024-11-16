import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    roles: {
        isAdmin: { type: Boolean, default: false },
        isUser: { type: Boolean, default: false },
    },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
    campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it's modified

    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
});



export default userSchema;
