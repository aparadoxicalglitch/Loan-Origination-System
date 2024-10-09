const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, loanController.submitLoan);
router.get('/status/:email', protect, loanController.getLoanStatus);
router.get('/', protect, admin, loanController.getAllLoans);
router.patch('/:id', protect, admin, loanController.updateLoanStatus);

module.exports = router;
