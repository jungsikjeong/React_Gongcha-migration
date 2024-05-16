const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  contents: {
    type: String,
  },
  images: [{ type: String, required: true }],
  postLikeCount: {
    type: Number,
    default: 0,
  },
  postCommentCount: {
    type: Number,
    default: 0,
  },
  hashtags: [
    {
      type: String,
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
