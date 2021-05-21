const httpStatusCode = require("../httpStatusCode");

const auth = {
  accessDenied: {
    statusCode: httpStatusCode.FORBIDDEN,
    code: "AU0001",
    message: "Área restrita",
  },

  expiredToken: {
    statusCode: httpStatusCode.UNAUTHORIZED,
    code: "AU0002",
    message: "Sessão expirada, faça login novamente!",
  },

  tokenNotProvided: {
    statusCode: httpStatusCode.BAD_REQUEST,
    code: "AU0003",
    message: "Token não fornecido!",
  },

  updatedRequired: {
    statusCode: httpStatusCode.UPDATED_REQUIRED,
    code: "AU0004",
    message:
      "Foram realizadas alterações no seu perfil. Por favor, faça login novamente!",
  },

  unauthorized: {
    statusCode: httpStatusCode.UNAUTHORIZED,
    code: "AU0005",
    message: "Acesso não autorizado",
  },

  errorOnValidateToken: {
    statusCode: httpStatusCode.UNPROCESSABLE_ENTITY,
    code: 'AU0006',
    message: 'Erro ao verificar o token'
  },

  malformedToken: {
    statusCode: httpStatusCode.BAD_REQUEST,
    code: 'AU0007',
    message: 'O token de autenticação está mal formado',
  },
};

module.exports = auth;
