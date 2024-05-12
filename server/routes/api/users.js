const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const { S3, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const { avatarUpload } = require('../../middleware/file-upload');

const generateAccessToken = require('../../utils/generate-access-token');

// @route   POST api/users (회원가입)
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    body('nickname', '닉네임을 확인해주세요! (2~6글자)')
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 6 }),
    body('email', '유효한 이메일을 입력해주세요!').isEmail(),
    body('password', '6자 이상의 비밀번호를 입력해주세요!').isLength({
      min: 6,
    }),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nickname, email, password, password2 } = req.body;
    try {
      // 사용자가 있는지 확인
      let user = await User.findOne({ $or: [{ email }, { nickname }] });

      if (user) {
        if (user.email === email) {
          return res.status(400).json({
            errors: [{ type: 'email', msg: '이미 사용중인 이메일입니다.' }],
          });
        } else if (user.nickname === nickname) {
          return res.status(400).json({
            errors: [{ type: 'nickname', msg: '이미 사용중인 닉네임입니다.' }],
          });
        }
      }

      // 사용자 Gravatar 가져 오기
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        nickname,
        email,
        avatar,
        password,
      });

      // 비밀번호 암호화
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = generateAccessToken({ payload });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
      res.cookie('refreshToken', refreshToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000, // 만료시간 3일
        httpOnly: true,
      });

      const userInfo = {
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
        commentCount: user.commentCount,
        postCount: user.postCount,
        date: user.date,
        __v: user.__v,
      };

      return res.json({
        token,
        userInfo,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/users/edit/avatar (프로필 이미지 편집)
// @desc    AvatarChange user
// @access  Private
router.post(
  '/edit/avatar',
  auth,
  (req, res, next) => {
    avatarUpload.single('file')(req, res, function (err) {
      if (err) {
        console.log(err);

        return res.status(400).json({ msg: err });
      }

      if (!req.file || req.file.length === 0) {
        return res
          .status(400)
          .json({ msg: '이미지를 하나 이상 업로드해주세요.' });
      }

      next();
    });
  },
  (req, res) => {
    res.status(201).json(req.file.location);
  }
);

// @route   POST api/users/edit/ (유저 정보 변경)
// @desc    User information change
// @access  Private
router.post('/edit/profile', auth, async (req, res) => {
  const { nickname, avatar, password, introduction, password2 } = req.body;

  try {
    let user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: '해당 유저를 찾을 수 없습니다.' });
    }

    if (password && password2) {
      if (password !== password2) {
        return res.status(400).json({ msg: '패스워드가 일치하지 않습니다.' });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    }

    if (avatar && user.avatar) {
      const avatarKey = user.avatar.split('/').pop();

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `avatarImages/${avatarKey}`,
        region: process.env.AWS_REGION,
      };

      // S3 객체 삭제
      const s3Client = new S3();
      await s3Client.send(new DeleteObjectCommand(params));
    }

    user.nickname = nickname || user.nickname;
    user.avatar = avatar || user.avatar;
    user.introduction = introduction || user.introduction;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
