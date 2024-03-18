const mongoose = require('mongoose');

const CommentScheme = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Post',
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', CommentScheme);
