const mongoose = require('mongoose');

const ReplyComment = new mongoose.Schema({
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'comment',
    required: true,
  },
  parentCommentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  contents: {
    type: String,
    required: false,
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
