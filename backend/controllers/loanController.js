const Loan = require('../models/loanModel');

// Submit a loan application
exports.submitLoan = async (req, res) => {
  try {
    const { name, email, amount, purpose } = req.body;
    const loan = await Loan.create({ name, email, amount, purpose });
    res.status(201).json({ message: 'Loan application submitted successfully', loan });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting loan application', error: error.message });
  }
};

// Get loan status (for users)
exports.getLoanStatus = async (req, res) => {
  try {
    const loan = await Loan.findOne({ email: req.params.email });
    if (!loan) {
      return res.status(404).json({ message: 'Loan application not found' });
    }
    res.json({ status: loan.status });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching loan status', error: error.message });
  }
};

// Get all loans (for admin)
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching loans', error: error.message });
  }
};

// Update loan status (for admin)
exports.updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(id, { status }, { new: true });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json({ message: 'Loan status updated successfully', loan });
  } catch (error) {
    res.status(400).json({ message: 'Error updating loan status', error: error.message });
  }
};
