const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { imageUpload } = require('../../middleware/file-upload');
const { S3, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const CommentLike = require('../../models/CommentLike');
const ReplyComment = require('../../models/CommentReply');
const CommentReplyLike = require('../../models/CommentReplyLike');
const PostLike = require('../../models/PostLike');
const Bookmark = require('../../models/Bookmark');

// @route   put api/posts/upload
// @desc    게시물 이미지 삭제
// @access  Private
router.put('/upload', auth, async (req, res) => {
  const { images } = req.body;

  // S3 객체 삭제
  const s3Client = new S3();

  const deletePromises = images.map((imageUrl) => {
    // URL에서 마지막 부분을 이미지 키로 뽑음
    const imageKey = imageUrl.split('/').pop();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `postImages/${imageKey}`,
      region: process.env.AWS_REGION,
    };

    return s3Client.send(new DeleteObjectCommand(params));
  });

  await Promise.all(deletePromises);

  return res.status(200).json({ msg: 'ok' });
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
  const { content, images, tags } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!images) {
      return res.status(400).json({ msg: '이미지를 먼저 업로드해주세요' });
    }

    if (images) {
      const newPost = new Post({
        contents: content || '',
        author: user._id,
        images: images,
        hashtags: tags ? tags : [],
      });

      const post = await newPost.save();

      res.json(post);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts
// @desc    게시물 수정
// @access  Private
router.put('/', auth, async (req, res) => {
  const { content, images, postId, hashtags } = req.body;
  try {
    const user = await User.findById(req.user.id).select('-password');
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ msg: '게시글이 없습니다.' });
    }

    if (!images) {
      return res.status(400).json({ msg: '이미지를 먼저 업로드해주세요' });
    }

    const updatedFields = {};

    if (content) {
      updatedFields.contents = content;
    }

    if (images) {
      updatedFields.images = images;
    }
    if (hashtags) {
      updatedFields.hashtags = hashtags;
    } else if (hashtags.length === 0 || !hashtags) {
      updatedFields.hashtags = [];
    }

    post = await Post.findByIdAndUpdate(
      postId,
      { $set: updatedFields },
      { new: true }
    ).exec();

    res.json(post);
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
    const searchParams = req.query.searchParams;

    if (searchParams) {
      const searchAgg = [
        {
          $search: {
            index: 'hashtags',
            text: {
              query: searchParams,
              path: 'hashtags',
            },
          },
        },
        { $sort: { date: -1 } },
        { $skip: skipPage },
        { $limit: limit },
      ];

      const countAgg = [
        {
          $search: {
            index: 'hashtags',
            text: {
              query: searchParams,
              path: 'hashtags',
            },
          },
        },
        { $count: 'total_count' },
      ];

      const [results, countResult] = await Promise.all([
        Post.aggregate(searchAgg),
        Post.aggregate(countAgg),
      ]);

      const total_count =
        countResult.length > 0 ? countResult[0].total_count : 0;

      res.json({
        page: parseInt(page),
        posts: results,
        totalCount: total_count,
        totalPage: Math.ceil(total_count / 10),
      });
      //   {
      //     $search: {
      //       index: 'hashtag',
      //       text: {
      //         query: searchParams,
      //         path: {
      //           wildcard: '*',
      //         },
      //       },
      //     },
      //   },
      //   { $sort: { date: -1 } },
      //   { $skip: skipPage },
      //   { $limit: limit },
      //   {
      //     $lookup: {
      //       from: 'posts', // 게시물 컬렉션 이름
      //       localField: 'post', // 현재 컬렉션의 post 필드
      //       foreignField: '_id', // 게시물 컬렉션의 _id 필드
      //       as: 'post',
      //     },
      //   },
      //   {
      //     $unwind: '$post', // 배열을 풀어줌
      //   },
      //   {
      //     $facet: {
      //       totalMatches: [{ $count: 'total' }],
      //       findPosts: [{ $addFields: { totalMatches: '$total' } }], // findPosts 배열에 totalMatches 추가
      //     },
      //   },
      // ];

      // const results = await Hashtag.aggregate(agg);
      // const totalCount = results[0]?.totalMatches[0]?.total;
      // const postsArray = results[0]?.findPosts?.map((post) => post?.post);

      // res.json({
      //   page: parseInt(page),
      //   posts: postsArray,
      //   totalCount: totalCount,
      //   totalPage: Math.ceil(totalCount / 10),
      // });
    } else {
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
    }
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

// @route   DELETE api/posts/:postId
// @desc    게시글 지우기
// @access  Private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const user = await User.findById(req.user.id).select('-password');

    if (!post) {
      return res.status(404).json({ msg: '게시글이 없습니다.' });
    }

    // check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: '게시글을 작성한 유저가 아닙니다.' });
    }

    // S3 객체 삭제
    const s3Client = new S3();

    const deletePromises = post.images.map((imageUrl) => {
      // URL에서 마지막 부분을 이미지 키로 뽑음
      const imageKey = imageUrl.split('/').pop();

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `postImages/${imageKey}`,
        region: process.env.AWS_REGION,
      };

      return s3Client.send(new DeleteObjectCommand(params));
    });

    await Promise.all(deletePromises);

    await Comment.deleteMany({ post: { $in: req.params.postId } });
    await CommentLike.deleteMany({ post: { $in: req.params.postId } });
    await ReplyComment.deleteMany({ post: { $in: req.params.postId } });
    await CommentReplyLike.deleteMany({ post: { $in: req.params.postId } });
    await PostLike.deleteMany({ post: { $in: req.params.postId } });
    await Bookmark.deleteMany({ post: { $in: req.params.postId } });
    await post.deleteOne();

    return res.status(204).json({ msg: '게시글 삭제 완료' });
  } catch (err) {
    console.log(err);
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

// @route   GET api/posts/bookmark/:postId
// @desc    게시글 북마크 확인
// @access  Private
router.get('/bookmark/:postId', auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }

    const user = await User.findById(req.user.id).select('-password');

    // 게시글 북마크 눌렀는지 체크
    const existingBookmark = await Bookmark.findOne({
      user: user._id,
      post: post._id,
    });
    // 좋아요를 눌렀으면 true를 반환
    if (existingBookmark) {
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

// @route   PUT api/posts/bookmark/:postId
// @desc    게시글 북마크 누르기
// @access  Private
router.put('/bookmark/:postId', auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }

    const user = await User.findById(req.user.id).select('-password');

    // 게시글 북마크 눌렀는지 체크
    const existingBookmark = await Bookmark.findOne({
      user: user._id,
      post: post._id,
    });

    if (existingBookmark) {
      // 이미 눌렀다면 취소
      await Bookmark.findByIdAndDelete(existingBookmark._id);

      return res.json({ msg: '북마크가 취소되었습니다.' });
    } else {
      // 해당 유저가 누르지 않은 경우에만 북마크 추가
      const newBookmark = new Bookmark({ user: userId, post: postId });
      await newBookmark.save();

      return res.json({ msg: '북마크가 추가되었습니다.' });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
