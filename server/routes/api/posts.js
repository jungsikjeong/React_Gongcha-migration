const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');

const Post = require('../../models/Post');
const PostLike = require('../../models/PostLike');
const User = require('../../models/User');

// @route   POST api/posts/upload
// @desc    게시물 이미지 업로드
// @access  Private
router.post(
  '/upload',
  auth,
  (req, res, next) => {
    imageUpload.array('files', 5)(req, res, function (err) {
      if (err) {
        if (err?.code === 'LIMIT_UNEXPECTED_FILE') {
          return res
            .status(400)
            .json({ msg: '파일은 최대 다섯개까지만 올려주세요.' });
        }

        return res.status(400).json({ msg: err });
      }

      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ msg: '이미지를 하나 이상 업로드해주세요.' });
      }

      next();
    });
  },
  (req, res) => {
    res.status(201).json(req.files.map((file) => file.location));
  }
);

// @route   POST api/posts
// @desc    게시물 작성
// @access  Private
router.post('/', auth, async (req, res) => {
  const { content, images } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!images) {
      return res.status(400).json({ msg: '이미지를 먼저 업로드해주세요' });
    }

    if (images) {
      const newPost = new Post({
        content: content || '',
        author: user._id,
        images: images,
      });

      const post = await newPost.save();

      res.json(post);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    모든 게시물 가져 오기
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit);
    const skipPage = parseInt(page) - 1;
    const count = await Post.countDocuments(); // 현재 db에 저장된 게시물 갯수

    const posts = await Post.find()
      .sort({ date: -1 })
      .skip(skipPage * 20)
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

// @route   GET api/posts/:id
// @desc    ID로 게시물 받기(특정 게시글 받기)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', [
      'nickname',
      'avatar',
    ]);

    if (!post) {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    게시글 지우기
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id).select('-password');

    if (!post) {
      return res.status(404).json({ msg: '게시글이 없습니다.' });
    }

    // aws s3 버킷에서 파일 삭제
    const url = post.image.split('/'); // post에 저장된 image를 가져옴
    const delFileName = url[url.length - 1];

    const params = {
      Bucket: 'gongcha',
      Key: `uploadImage/${delFileName}`,
    };

    upload.s3.deleteObject(params, function (err, data) {
      console.log(params);

      if (err) {
        console.log('aws image delete error');
        console.log(err, err.stack);
        return;
      } else {
        console.log('aws image delete success' + data);
      }
    });

    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '게시글을 작성한 유저가 아닙니다.' });
    }
    const userPost = user.posts.filter(
      (post) => post._id.toString() !== req.params.id
    );
    // Get remove index
    const removeIndex = user.posts
      .map((post) => post._id.toString())
      .indexOf(req.user.id);

    user.posts.splice(removeIndex, 1);

    await user.save();
    await post.remove();

    res.json({ msg: '게시글 삭제 완료' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/like/:postId
// @desc    게시글 좋아요 확인
// @access  Private
router.get('/like/:postId', auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }

    const user = await User.findById(req.user.id).select('-password');

    // 게시글에 좋아요 눌렀는지 체크
    const existingLike = await PostLike.findOne({
      user: user._id,
      post: post._id,
    });

    // 좋아요를 눌렀으면 true를 반환
    if (existingLike) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/posts/like/:postId
// @desc    게시글 좋아요 누르기
// @access  Private
router.put('/like/:postId', auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }

    const user = await User.findById(req.user.id).select('-password');

    // 게시글에 좋아요 눌렀는지 체크
    const existingLike = await PostLike.findOne({
      user: user._id,
      post: post._id,
    });

    if (existingLike) {
      // 이미 좋아요를 눌렀다면 해당 좋아요를 취소
      await PostLike.findByIdAndDelete(existingLike._id);

      post.postLikeCount -= 1;
      await post.save();

      return res.json({ msg: '좋아요가 취소되었습니다.' });
    } else {
      // 해당 유저가 좋아요를 누르지 않은 경우에만 좋아요를 추가
      const newLike = new PostLike({ user: userId, post: postId });
      await newLike.save();

      post.postLikeCount += 1;

      await post.save();

      return res.json({ msg: '좋아요가 추가되었습니다.' });
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
