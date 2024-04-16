const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    required: false,
  },
});

module.exports = mongoose.model('like', LikeSchema);
