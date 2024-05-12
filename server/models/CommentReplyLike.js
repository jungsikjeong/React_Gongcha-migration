const mongoose = require('mongoose');

const CommentReplyLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  commentReply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'commentReply',
    required: true,
  },
});

module.exports = mongoose.model('commentReplyLike', CommentReplyLikeSchema);
