const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

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

// @route   POST api/users/edit/avatar (프로필 이미지 편집)
// @desc    AvatarChange user
// @access  Private
router.post('/edit/avatar', async (req, res) => {
  // 프론트 에서 가져온 이미지를 저장을 해준다.
  upload.avatarUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    if (!req.file) return res.send('Please upload a file');

    return res.json({
      success: true,
      filePath: res.req.file.location,
      fileName: res.req.file.originalname,
    });
  });
});

// @route   POST api/users/edit/ (유저 정보 변경)
// @desc    User information change
// @access  Private
router.post('/edit/profile', auth, async (req, res) => {
  const { name, avatar } = req.body;

  try {
    let user = await User.findOne({ _id: req.user.id }).select('-password');

    if (user) {
      // Update
      const newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            name: name ? name : user.name,
            avatar: avatar ? avatar : user.avatar,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);

      // const post = await Post.findByIdAndUpdate(
      //   user,
      //   {
      //     $set: {
      //       user: req.user.id,
      //     },
      //   },
      //   { multi: true, new: true }
      // ).exec();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/profile/:user_id
// @desc    사용자 ID로 프로필 가져 오기
// @access  Public
router.get('/profile/:user_id', async (req, res) => {
  try {
    const profile = await User.findById(req.params.user_id)
      .select('-password')
      .populate('posts', ['image', 'text']);

    if (!profile)
      return res.status(400).json({ msg: '프로필을 찾을 수 없습니다.' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // 경로로오는 user_id가 + - 면 발생하는 에러를 잡아줌
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: '프로필을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
