const mongoose = require('mongoose');

const ReplyComment = new mongoose.Schema({
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'comment',
  },

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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

module.exports = mongoose.model('comment', ReplyComment);
