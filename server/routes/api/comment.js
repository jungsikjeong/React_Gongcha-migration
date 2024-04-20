const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');

const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const CommentLike = require('../../models/CommentLike');
const User = require('../../models/User');

// @route   POST api/comment/
// @desc    댓글 작성
// @access  Private
router.post('/', auth, async (req, res) => {
  const { contents, postId } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');

    if (postId) {
      const newComment = new Comment({
        contents: contents || '',
        user: user._id,
        post: postId,
      });
      const comment = await newComment.save();
      return res.json(comment);
    } else {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/comment/:postId
// @desc    특정 게시물 ID로 댓글 정보 얻기
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: '해당 게시글을 찾을 수 없습니다' });
    }
    const commentList = await Comment.find({ post: req.params.id })
      .populate('user', ['nickname', 'avatar'])
      .populate('likes', ['user']);

    if (!commentList) {
      return res.status(404).json({ msg: '댓글 정보를 찾을 수 없습니다' });
    }

    // // comments 배열에 담긴 각 댓글에 대한 좋아요 정보를 가져옵니다.
    // const commentsWithLikes = await Promise.all(
    //   commentList.map(async (comment) => {
    //     // 해당 댓글에 대한 좋아요 정보를 가져옵니다.
    //     const likes = await CommentLike.find({ comment: comment._id });

    //     // 댓글 객체에 좋아요를 누른 사용자들의 ID 목록을 추가합니다.
    //     const likedUserIds = likes.map((like) => like.user.toString());

    //     // comment 객체에 좋아요 정보를 추가하여 반환합니다.
    //     return {
    //       ...comment.toObject(),
    //       likes: likedUserIds, // 댓글에 좋아요를 누른 사용자들의 ID 목록을 추가합니다.
    //     };
    //   })
    // );

    res.json(commentList);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: '댓글을 불러오던중 에러가 발생했습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/comment/:commentId
// @desc    댓글 지우기
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const post = await Post.findById(req.query.postId);

    if (!post) {
      return res
        .status(404)
        .json({ msg: '해당 댓글이 작성된 게시글을 찾을 수 없습니다' });
    }

    // 로그인 유져
    const user = await User.findById(req.user.id).select('-password');
    // 댓글 작성한 유저
    const commentAuthor = await Comment.findById(commentId);

    if (
      commentId &&
      user._id &&
      commentAuthor &&
      user._id.toString() === commentAuthor.user.toString()
    ) {
      // 로그인한 유저와 댓글 작성자가 같으면
      await Comment.findByIdAndDelete(commentId);
      await CommentLike.deleteMany({ comment: commentId });
      return res.status(200).json({ msg: '댓글이 성공적으로 삭제되었습니다.' });
    } else {
      // 로그인한 유저와 댓글 작성자가 같지 않으면
      return res.status(404).json({
        msg: '댓글을 작성한 유저가 아닙니다. 올바른 경로로 시도해주세요',
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: '에러가 발생했습니다. 다시 시도해주세요.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/comment/like/:commentId
// @desc    댓글 좋아요 누르기
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const post = await Post.findById(req.query.postId);

    if (!post) {
      return res
        .status(404)
        .json({ msg: '해당 댓글이 작성된 게시글을 찾을 수 없습니다' });
    }

    // 로그인 유져
    const user = await User.findById(req.user.id).select('-password');
    // 댓글 작성한 유저
    const comment = await Comment.findById(commentId);

    // 해당 유저가 이미 해당 댓글에 대한 좋아요를 눌렀는지 확인
    const existingLike = await CommentLike.findOne({
      user: user._id,
      comment: commentId,
    });

    if (existingLike) {
      // 이미 좋아요를 눌렀다면 해당 좋아요를 취소
      await CommentLike.findByIdAndDelete(existingLike._id);

      // 해당 댓글의 좋아요 목록에서 해당 좋아요를 제거
      const index = comment.likes.indexOf(existingLike._id);
      if (index > -1) {
        comment.likes.splice(index, 1);
      }

      await comment.save();

      return res.json({ msg: '좋아요가 취소되었습니다.' });
    } else {
      // 해당 유저가 좋아요를 누르지 않은 경우에만 좋아요를 추가
      const newCommentLike = new CommentLike({
        user: user._id,
        post: post._id,
        comment: commentId,
      });

      const commentLike = await newCommentLike.save();

      comment.likes.push(newCommentLike);
      await comment.save();

      return res.json(commentLike);
    }
  } catch (err) {
    console.error(err);
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
