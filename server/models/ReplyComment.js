const mongoose = require('mongoose');

const ReplyComment = new mongoose.Schema({
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'comment',
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', ReplyComment);
