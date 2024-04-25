const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');

const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const CommentReplyLike = require('../../models/CommentReplyLike');
const CommentReply = require('../../models/CommentReply');
const User = require('../../models/User');

// @route   GET api/reply/:postId
// @desc    댓글ID로 대댓글 정보 얻기
// @access  Public
router.get('/comment/:commentId', async (req, res) => {
  try {
    const commentList = await Comment.findById(req.params.commentId);

    if (!commentList) {
      return res.status(404).json({ msg: '댓글 정보를 찾을 수 없습니다' });
    }

    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit);
    const skipPage = parseInt(page) - 1;

    const count = await CommentReply.countDocuments({
      parentComment: req.params.commentId,
    });

    const commentReply = await CommentReply.find({
      parentComment: req.params.commentId,
    })
      .populate('user', ['nickname', 'avatar'])
      .populate('parentCommentUser', ['nickname'])
      .populate('likes')
      .sort({ date: -1 })
      .skip(skipPage * 3)
      .limit(limit)
      .exec();

    res.json({
      page: parseInt(page),
      commentReply: commentReply,
      totalCount: count,
      totalPage: Math.ceil(count / 3),
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

// @route   POST api/reply/comment/:parentsComment_id
// @desc    게시글에 대댓글 작성
// @access  Private
router.post('/comment/:comment_id', auth, async (req, res) => {
  const { contents, postId } = req.body;

  try {
    const commentId = req.params.comment_id;

    const user = await User.findById(req.user.id).select('-password');
    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
    }

    if (postId && parentComment) {
      const newCommentReply = new CommentReply({
        parentComment: parentComment,
        parentCommentUser: parentComment.user,
        contents: contents || '',
        user: user._id,
      });
      const commentReply = await newCommentReply.save();
      parentComment.commentReplyCount += 1;
      await parentComment.save();
      return res.json(commentReply);
    } else {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   DELETE api/reply/:commentReplyId?parentCommentId=parentCommentId
// @desc    대댓글 삭제
// @access  Private
router.delete('/:commentReplyId', auth, async (req, res) => {
  try {
    const commentReplyId = req.params.commentReplyId;
    const parentCommentId = req.query.parentCommentId;

    // 로그인 유져
    const user = await User.findById(req.user.id).select('-password');
    // 대댓글을 작성한 유저
    const commentReply = await CommentReply.findById(commentReplyId);
    const parentComment = await Comment.findById(parentCommentId);

    if (!commentReply || !parentComment) {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
    }

    if (
      user._id &&
      parentComment &&
      commentReply &&
      user._id.toString() === commentReply.user.toString()
    ) {
      // 로그인한 유저와 댓글 작성자가 같으면
      await CommentReply.findByIdAndDelete(commentReplyId);
      await CommentReplyLike.deleteMany({ commentReply: commentReplyId });
      parentComment.commentReplyCount -= 1;
      await parentComment.save();
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

// @route   PUT api/reply/like/:commentReplyId
// @desc    대댓글 좋아요 누르기
// @access  Private
router.put('/like/:commentReplyId', auth, async (req, res) => {
  try {
    const commentReplyId = req.params.commentReplyId;
    const parentCommentId = req.query.parentCommentId;

    const comment = await Comment.findById(commentReplyId);

    // 로그인 유져
    const user = await User.findById(req.user.id).select('-password');
    // 댓글 작성한 유저
    const commentReply = await CommentReply.findById(commentReplyId);

    // 해당 유저가 이미 해당 댓글에 대한 좋아요를 눌렀는지 확인
    const existingLike = await CommentReplyLike.findOne({
      user: user._id,
      commentReply: commentReplyId,
    });

    if (existingLike) {
      // 이미 좋아요를 눌렀다면 해당 좋아요를 취소
      await CommentReplyLike.findByIdAndDelete(existingLike._id);

      // 해당 댓글의 좋아요 목록에서 해당 좋아요를 제거
      const index = commentReply.likes.indexOf(existingLike._id);
      if (index > -1) {
        commentReply.likes.splice(index, 1);
      }

      await commentReply.save();

      return res.json({ msg: '좋아요가 취소되었습니다.' });
    } else {
      // 해당 유저가 좋아요를 누르지 않은 경우에만 좋아요를 추가
      const newCommentReplyLike = new CommentReplyLike({
        user: user._id,
        commentReply: commentReplyId,
        parentComment: parentCommentId,
      });

      const commentReplyLike = await newCommentReplyLike.save();

      commentReply.likes.push(commentReplyLike);
      await commentReply.save();

      return res.json(commentReplyLike);
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
