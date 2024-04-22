const mongoose = require('mongoose');

const CommentReplyLike = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
  },
  commentReply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'commentReply',
    required: true,
  },
});

module.exports = mongoose.model('commentReplyLike', CommentReplyLike);
