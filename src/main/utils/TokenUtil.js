const {verify, sign } = require('jsonwebtoken');

const { jwt } = require("./../../../configuration.json");

class TokenUtil{
    static genereteToken(user){
        return sign({ user }, jwt.secret, { expiresIn: jwt.expiresIn });
    }
    static decodeToken(token){
        return verify(token, jwt.secret);
    }
}

module.exports = TokenUtil;