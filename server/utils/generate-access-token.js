const jwt = require('jsonwebtoken');

module.exports = function generateAccessToken({ payload }) {
  return jwt.sign(payload, proess.env.JWT_SECRET, { expiresIn: '15m' });
};
c;
