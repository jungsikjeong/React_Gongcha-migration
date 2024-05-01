const mongoose = require('mongoose');

const Bookmark = new mongoose.Schema({
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
});

module.exports = mongoose.model('bookmark', Bookmark);
