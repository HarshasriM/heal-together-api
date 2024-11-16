import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
    campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
}, { timestamps: true });

// Hash the password before saving

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const SALT=bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate(){
    return jwt.sign({ _id: this._id, username:this.username,email: this.email, role: this.role },process.env.JWT_WEB_TOKEN, {
        expiresIn: '1d'
    });
}




export default userSchema;
