const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  content: {
    type: String,
  },

  images: [{ type: String, required: true }],

  postLikeCount: {
    type: Number,
    default: 0,
  },

  commentsCount: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
