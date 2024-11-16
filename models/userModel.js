// models/User.js

import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema.js';

// Create the model using the imported schema
const User = mongoose.model('User', userSchema);

export default User;
