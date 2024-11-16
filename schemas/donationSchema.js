// schemas/donationSchema.js

import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['card', 'upi'], // Specifies the payment method
      required: true,
    },
    cardDetails: {
      cardNumber: {
        type: String,
        required: function () { return this.type === 'card'; },
      },
      cardHolderName: {
        type: String,
        required: function () { return this.type === 'card'; },
      },
      expiryDate: {
        type: String,
        required: function () { return this.type === 'card'; },
      },
    },
    upiDetails: {
      upiId: {
        type: String,
        required: function () { return this.type === 'upi'; },
      },
    },
    donorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionId: {
      type: String, // To store the unique transaction identifier
      default: null, // Initially set as null
    },
    donationDate: { type: Date, default: Date.now() },
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  });
  

export default donationSchema;
