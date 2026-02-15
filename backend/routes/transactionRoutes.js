const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction, // Add update functionality
    getSummary
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTransactions)
    .post(protect, addTransaction);

// Transaction ID route
router.route('/:id')
    .delete(protect, deleteTransaction)
    .put(protect, updateTransaction); // Add update route

// Dashboard Summary Route
router.route('/summary').get(protect, getSummary); 
// Note: Put this ABOVE '/:id' if calling /summary directly, 
// otherwise transactionController logic might interpret 'summary' as an ID unless validated.

module.exports = router;
