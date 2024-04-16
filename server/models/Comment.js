const mongoose = require('mongoose');

const CommentScheme = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'post',
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

module.exports = mongoose.model('comment', CommentScheme);
