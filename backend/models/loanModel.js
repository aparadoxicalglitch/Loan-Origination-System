const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  status: { type: String, enum: ['submitted', 'in review', 'approved', 'rejected'], default: 'submitted' },
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
