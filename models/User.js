const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  tgId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  totalScore: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
