const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      default: 0.0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },


    milk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milk',
      default: null // null for no choice, ie lemonade
    },

    temperature: {
      type: String,
      enum: ['FREE', 'HOT', 'COLD'], 
      default: 'FREE', // no choice, ie lemonade
    },

    sugar: {
      type: String,
      enum: ['FREE', '0%', '25%', '50%','75%', '100%'], 
      default: '0%',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);
