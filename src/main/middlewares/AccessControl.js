const { decodeToken } = require('../utils/TokenUtil');
const customError = require('../helpers/customError');
const enumHelper = require('../helpers/enumHelper');
const UserService = require('../services/UserService');
const responseBuilder = (res) => (responsePayload) => 
  res.status(responsePayload.statusCode).send(responsePayload)


class AccessControl {
  constructor(entity) {
    const target = entity;
    this.verify = async (req, res, next) => {
      const sendResponseToClient = responseBuilder(res);
      const token = req.headers['x-access-token'];
      if (!token) return sendResponseToClient(customError.auth.tokenNotProvided);

      try {
        const { user, iat } = decodeToken(token);

        if (!user || !user.id_user)
          return sendResponseToClient(customError.auth.accessDenied);

        const { role, require_auth } = await UserService.findById(user.id_user);

        if (iat * 1000 < require_auth.getTime())
          return sendResponseToClient(customError.auth.updatedRequired);

        if (!role) return sendResponseToClient(customError.auth.unauthorized);

        if (target === role || role === enumHelper.user.roles.admin) next();
        else return sendResponseToClient(customError.auth.unauthorized);
      } catch (error) {    
        global.logger.error( `AccessControl: erro ao verificar o token: ${error.message}`);
        if(error.message.includes('jwt malformed'))
          return sendResponseToClient(customError.auth.malformedToken);
        else if(error.message.includes('jwt expired'))
          return sendResponseToClient(customError.auth.expiredToken);
        else 
          return sendResponseToClient(customError.auth.errorOnValidateToken);
      }
    };
  }
}
module.exports = AccessControl;
