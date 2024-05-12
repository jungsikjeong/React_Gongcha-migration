const mongoose = require('mongoose');

const HashtagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  hashtags: [{ type: String, required: true }],
});

module.exports = mongoose.model('hashtag', HashtagSchema);
