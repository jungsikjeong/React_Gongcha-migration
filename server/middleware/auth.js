const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function (req, res, next) {
  // 헤더에서 토큰 가져 오기
  const token = req.header('Authorization')
    ? req.header('Authorization').split(' ')[1]
    : null;

  // 토큰 확인
  if (!token) {
    return res.status(401).json({ msg: '인증되지 않은 사용자입니다.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    // console.log('decoded:', decoded);
    req.user = decoded.user;
    req.token = token;

    next();
  } catch (err) {
    res.status(401).json({ msg: ' Token is not valid' });
  }
};
