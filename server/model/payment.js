const mongoose = require('mongoose');

const ChallanSchema = new mongoose.Schema({
  optionId: {
    type: String,
    required: true,
  },
  optionText: {
    type: String,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

});

const Challan = mongoose.model('Challan', ChallanSchema);

module.exports = Challan;
