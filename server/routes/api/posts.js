const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');

const Post = require('../../models/Post');
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
        name: user.nickname,
        avatar: user.avatar,
        images: images,
        author: req.user.id,
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
    const posts = await Post.find().sort({
      date: -1,
    });

    res.json(posts);
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
    const post = await Post.findById(req.params.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar'])
      .populate('comments.commentsStep.user', ['name', 'avatar']);

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

// @route   PUT api/posts/like/:id
// @desc    게시글 좋아요 누르기
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // 게시글이 이미 좋아요 눌렀는지 확인
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: '이미 좋아요를 누른 게시글 입니다.' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    게시글 좋아요 취소하기
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // 게시물에 좋아요를 눌렀는지 확인
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: '게시글에 좋아요를 먼저 눌러주세요.' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    게시글에 댓글 작성
// @access  Private
router.post(
  '/comment/:id',
  [auth, [check('text', '댓글을 입력해주세요').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id).populate(
        'comments.user',
        ['name', 'avatar']
      );

      const newComment = {
        text: req.body.text,
        user: user,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    댓글 삭제
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // 댓글이 있는지 확인
    if (!comment) {
      // return res.status(404).json({ msg: '댓글이 없습니다.' });
      return console.log('댓글이 없습니다');
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: '유저가 일치하지 않습니다.' });
    }

    // Get remove index
    // 댓글 삭제
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/like/:id/:comment_id
// @desc    댓글 좋아요 누르기
// @access  Private
router.put('/comment/like/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // 댓글이 이미 좋아요 눌렀는지 확인
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: '이미 좋아요를 누른 댓글입니다.' });
    }

    comment.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(comment.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
      // return console.log('댓글없엉');
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/unlike/:id/:comment_id
// @desc    댓글 좋아요 취소하기
// @access  Private
router.put('/comment/unlike/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // 게시물에 좋아요를 눌렀는지 확인
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: '댓글에 좋아요를 먼저 눌러주세요' });
    }

    //Get remove index
    const removeIndex = comment.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    comment.likes.splice(removeIndex, 1);

    await post.save();

    res.json(comment.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/step/:id/:comment_id
// @desc    게시글에 대댓글 작성
// @access  Private
router.post(
  '/comment/step/:id/:comment_id',
  [auth, [check('text', '댓글을 입력해주세요').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id)
        .populate('comments.user', ['name', 'avatar'])
        .populate('comments.commentsStep.user', ['name', 'avatar']);

      const comment = await post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      const newComment = {
        text: req.body.text,
        user: user,
      };

      comment.commentsStep.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/step/:id/:comment_id
// @desc    대댓글 삭제
// @access  Private
router.delete('/comment/step/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('comments.user', ['name', 'avatar'])
      .populate('comments.commentsStep.user', ['name', 'avatar']);

    const commentStep = post.comments.map((comment) =>
      comment.commentsStep.find(
        (commentStep) => commentStep.id === req.params.comment_id
      )
    );

    // 댓글이 있는지 확인
    if (!commentStep) {
      // return res.status(404).json({ msg: '댓글이 없습니다.' });
      return console.log('댓글이 없습니다');
    }

    if (commentStep) {
      // Get remove index
      // 댓글 삭제
      const removeIndex = post.comments.map((comment) =>
        comment.commentsStep
          .map((commentStep) => commentStep.id)
          .indexOf(req.params.comment_id)
      );

      post.comments.map((comment) =>
        comment.commentsStep.splice(removeIndex, 1)
      );

      await post.save();

      return res.json(post.comments);
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: '유저가 일치하지 않습니다.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/step/like/:id/:comment_id
// @desc    대댓글 좋아요 누르기
// @access  Private
router.put('/comment/step/like/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const commentStep = post.comments.map((comment) =>
      comment.commentsStep.find(
        (commentStep) => commentStep.id === req.params.comment_id
      )
    );
    // console.log(commentStep);
    const reply = commentStep.find((step) => step.id === req.params.comment_id);

    // 댓글이 이미 좋아요 눌렀는지 확인
    if (
      reply.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: '이미 좋아요를 누른 댓글입니다.' });
    }

    reply.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(reply.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
      // return console.log('댓글없엉');
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/step/unlike/:id/:comment_id
// @desc    대댓글 좋아요 취소하기
// @access  Private
router.put('/comment/step/unlike/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const commentStep = post.comments.map((comment) =>
      comment.commentsStep.find(
        (commentStep) => commentStep.id === req.params.comment_id
      )
    );
    const reply = commentStep.find((step) => step.id === req.params.comment_id);

    // 게시물에 좋아요를 눌렀는지 확인
    if (
      reply.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: '댓글에 좋아요를 먼저 눌러주세요' });
    }

    //Get remove index
    const removeIndex = reply.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    reply.likes.splice(removeIndex, 1);

    await post.save();

    res.json(reply.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
