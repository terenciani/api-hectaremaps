const { auth } = require('./customError')
const enumHelpers = {
    user: {
        roles: {
            admin: 'ADMIN',
            regularUser: 'USER'
        },
        errosWithRequiresLogin: [
            auth.errorOnValidateToken.code,
            auth.expiredToken.code,
            auth.malformedToken.code,
            auth.tokenNotProvided.code,
            auth.unauthorized.code,
            auth.updatedRequired.code,
            auth.accessDenied.code
        ]
    }
};

module.exports = enumHelpers;