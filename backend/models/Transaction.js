const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a text value'],
            trim: true,
        },
        amount: {
            type: Number,
            required: [true, 'Please add a positive or negative number'],
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Salary', 'Investment', 'Other'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
            enum: ['income', 'expense'],
            required: true, 
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
