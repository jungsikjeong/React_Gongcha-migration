const mongoose = require('mongoose');

const ReplyComment = new mongoose.Schema({
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'comment',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commentReplyLike',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('commentReply', ReplyComment);
