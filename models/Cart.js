const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },

    menuitem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },

    milk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milk',
      required: true,
    },

    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size',
      required: true,
      default: null,
    },

    temperature: {
      type: String,
      enum: ['HOT', 'COLD', 'FREE'], 
      default: 'FREE',
      required: true,
    },

    sugar: {
      type: String,
      enum: ['0%', '25%', '50%','75%', '100%'], 
      default: '0%',
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      default: 0.0,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
});
