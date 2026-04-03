const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please add an amount']
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify type (income/expense)']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Search indexing
recordSchema.index({ category: 'text', description: 'text' });

module.exports = mongoose.model('Record', recordSchema);
