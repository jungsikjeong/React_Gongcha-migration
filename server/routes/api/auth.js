const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/auth
// @desc    user by token
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id는 auth(미들웨어)의 req.user에서 가져오는것임
    const user = await User.findById(req.user.id).select('-password');

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
    console.log(req.body);
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

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token,
            user: {
              nickname: user.nickname,
              email: user.email,
              avatar: user.avatar,
            },
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
