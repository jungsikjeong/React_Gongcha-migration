const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');

const Post = require('../../models/Post');
const PostLike = require('../../models/PostLike');
const User = require('../../models/User');

// @route   GET api/myPage
// @desc    내가 작성한 게시물 모두 가져 오기
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit);
    const skipPage = parseInt(page) - 1;
    const count = await Post.countDocuments(); // 현재 db에 저장된 게시물 갯수

    const posts = await Post.find({ author: req.user.id })
      .sort({ date: -1 })
      .skip(skipPage * 10)
      .limit(limit)
      .exec();

    res.json({
      page: parseInt(page),
      posts: posts,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
