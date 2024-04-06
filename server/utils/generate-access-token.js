const jwt = require('jsonwebtoken');

module.exports = function generateAccessToken({ payload }) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10s' });
};
