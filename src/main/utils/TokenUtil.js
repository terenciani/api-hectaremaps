const { verify, sign } = require('jsonwebtoken');

class TokenUtil {
  static genereteToken(user) {
    return sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
  static decodeToken(token) {
    return verify(token, process.env.JWT_SECRET);
  }
}
module.exports = TokenUtil;
