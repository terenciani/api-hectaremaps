const { decodeToken } = require('../utils/TokenUtil');

const UserService = require("../services/UserService");

class AccessControl {
    constructor (entity){
        const target = entity;
        this.verify = async (req, res, next) =>{
            const token = req.headers['x-access-token'];
            if(!token) return res.status(400).send('Token não fornecido');

            try {
                const {user} = decodeToken(token);
                
                if(!user || !user.id_user) 
                    return res.status(401).send('Acesso não autorizado: Token inválido');
                
                const { role } = await UserService.findById(user.id_user)

                if(!role)
                    return res.status(401).send('Acesso não autorizado');

                if(target === role || role === 'ADMIN') next()
                else return res.status(401).send('Acesso não autorizado');
                
            } catch (error) {
                res.status(498).send('Erro ao verificar o token');
                global.logger.error(
                    `AccessControl: erro ao verificar o token: ${error.message}`
                )
            }
        }
    }
}
module.exports = AccessControl;