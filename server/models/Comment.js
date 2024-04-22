const mongoose = require('mongoose');

const CommentScheme = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'post',
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
  commentReplyCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commentLike',
    },
  ],
  commentReply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'commentReply',
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', CommentScheme);
