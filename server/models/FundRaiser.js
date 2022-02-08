const mongoose = require('mongoose');
const CharityPartner = require('../models/CharityPartner');

const FundRaiser = mongoose.model('FundRaiser', {
  name: {
    type: String,
  },
  charityName: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  requiredAmt: {
    type: Number,
  },
  receivedAmt: {
    type: Number,
  },
  status: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CharityPartner',
  },
});

module.exports = FundRaiser;
