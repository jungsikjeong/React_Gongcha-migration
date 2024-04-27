const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  postLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
