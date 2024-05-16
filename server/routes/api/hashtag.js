const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Hashtag = require('../../models/Hashtag');

// @route   POST api/hashTag
// @desc    해시태그 저장
// @access  Private
router.post('/', auth, async (req, res) => {
  const { tags, postId } = req.body;

  try {
    if (!postId) {
      return res.status(400).json({ msg: '게시글이 없습니다.' });
    }

    const newHashtags = new Hashtag({
      user: req.user.id,
      post: postId,
      hashtags: tags,
    });

    const hashtags = await newHashtags.save();

    res.json(hashtags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/hashTag
// @desc    해시태그 변경
// @access  Private
router.put('/', auth, async (req, res) => {
  const { tags, postId } = req.body;

  try {
    if (!postId) {
      return res.status(400).json({ msg: '게시글이 없습니다.' });
    }
    const hashtag = await Hashtag.findOne({ post: postId });

    if (!hashtag) {
      const newHashtags = new Hashtag({
        user: req.user.id,
        post: postId,
        hashtags: tags,
      });

      const hashtags = await newHashtags.save();

      return res.json(hashtags);
    }

    if (hashtag) {
      hashtag.hashtags = tags;
      await hashtag.save();
      res.json(hashtag);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
