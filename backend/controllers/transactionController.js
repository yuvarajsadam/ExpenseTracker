const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');

// @desc    Get transactions
// @route   GET /api/v1/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
    const { search, category, startDate, endDate, sort, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };

    // Filtering
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
        query.category = category;
    }
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
        .sort(sort ? sort : { date: -1 }) // Default sort by date
        .limit(Number(limit))
        .skip(skip);

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
        success: true,
        count: transactions.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: transactions
    });
});

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Private
const addTransaction = asyncHandler(async (req, res) => {
    // Basic validation handled by Mongoose schema, but custom checks can go here
    const { title, amount, category, date, description, type } = req.body;

    const transaction = await Transaction.create({
        user: req.user.id,
        title,
        amount,
        category,
        date,
        description,
        type
    });

    res.status(201).json({
        success: true,
        data: transaction
    });
});

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await transaction.deleteOne();

    res.status(200).json({ id: req.params.id });
});

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedTransaction);
});

// @desc    Get Summary Stats
// @route   GET /api/v1/transactions/summary
// @access  Private
const getSummary = asyncHandler(async (req, res) => {
    const income = await Transaction.aggregate([
        { $match: { user: req.user._id, type: 'income' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const expense = await Transaction.aggregate([
        { $match: { user: req.user._id, type: 'expense' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const categoryBreakdown = await Transaction.aggregate([
        { $match: { user: req.user._id, type: 'expense' } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
        income: income[0] ? income[0].total : 0,
        expense: expense[0] ? expense[0].total : 0,
        balance: (income[0] ? income[0].total : 0) - (expense[0] ? expense[0].total : 0),
        categoryBreakdown
    });
});

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getSummary
};
