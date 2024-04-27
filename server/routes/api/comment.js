const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');

const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const CommentLike = require('../../models/CommentLike');
const CommentReply = require('../../models/CommentReply');
const CommentReplyLike = require('../../models/CommentReplyLike');
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
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: '해당 게시글을 찾을 수 없습니다' });
    }

    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit);
    const skipPage = parseInt(page) - 1;
    const count = await Comment.countDocuments({ post: req.params.postId }); // 현재 db에 저장된 댓글 갯수

    const commentList = await Comment.find({ post: req.params.id })
      .populate('user', ['nickname', 'avatar'])
      .populate('likes', ['user'])
      .sort({ date: -1 })
      .skip(skipPage * 10)
      .limit(limit)
      .exec();

    if (!commentList) {
      return res.status(404).json({ msg: '댓글 정보를 찾을 수 없습니다' });
    }
    res.json({
      page: parseInt(page),
      commentList: commentList,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
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
    const comment = await Comment.findById(commentId);

    // 로그인한 유저와 댓글 작성자가 같으면
    if (
      user._id &&
      comment &&
      user._id.toString() === comment.user.toString()
    ) {
      const commentReplies = await CommentReply.find({
        parentComment: commentId,
      });
      // 대댓글이 존재하는 경우
      if (commentReplies.length > 0) {
        // 대댓글 좋아요 삭제
        await CommentReplyLike.deleteMany({ parentComment: commentId });
        // 대댓글 삭제
        await CommentReply.deleteMany({ parentComment: commentId });
      }
      // 댓글 삭제 및 댓글 좋아요 삭제
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

module.exports = router;
