const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

const generateAccessToken = require('../../utils/generate-access-token');

// @route   GET api/auth
// @desc    user by token
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id는 auth(미들웨어)의 req.user에서 가져오는것임
    const user = await User.findById(req.user.id).select('-password');
    console.log('user:', user);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth (로그인)
// @desc    사용자 인증 및 토큰 받기
// @access  Public
router.post(
  '/',
  [
    body('email', '유효한 이메일을 입력해주세요!').isEmail(),
    body('password', '6~8자의 비밀번호를 입력해주세요!').isLength({
      min: 6,
      max: 8,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // 사용자가 있는지 확인
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ type: 'email', msg: '등록된 이메일이 없습니다.' }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ type: 'email', msg: '비밀번호가 일치하지 않습니다.' }],
        });
      }

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
        // maxAge: 3 * 24 * 60 * 60 * 1000, // 만료시간 3일
        maxAge: 10 * 1000,
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

// @route   GET api/auth/refresh
// @desc    user by refresh token
// @access  Private
router.get('/refresh', (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ msg: '리프레시 토큰 없음' });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        const userInfo = await User.findById(user.user.id).select('-password');
        if (err) return res.sendStatus(403);

        const payload = {
          user: {
            id: user.id,
          },
        };

        const accessToken = generateAccessToken({ payload });

        res.json({
          token: accessToken,
          userInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  // 리프레시 토큰 쿠키 삭제
  res.clearCookie('refreshToken');
  res.status(200).send('로그아웃 되었습니다.');
});

module.exports = router;
