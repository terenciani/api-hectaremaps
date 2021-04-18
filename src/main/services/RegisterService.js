'use strict';

const md5 = require('md5');
const EmailService = require('./EmailService');
const TokenUtil = require('../utils/TokenUtil');
const generator = require('generate-password');
const Database = require('../database/Connection');
const UserService = require('../services/UserService');
const { mail, api, admin } = require('../../../configuration.json');

module.exports = class RegisterService {
  static async signUp(data) {
    try {
      let result = await Database('user').where({ email: data.email }).first();

      if (!result || !result.id_user) {
        await UserService.create(data);
        EmailService.registerNotify(data);
        return {
          status: 200,
          message:
            'Pedido de registro realizado! Um link de confirmação foi enviado para o email informado. Em 48 horas ele irá expirar',
        };
      } else {
        return { status: 422, message: 'E-mail já cadastrado!' };
      }
    } catch (error) {
      throw new Error('RegisterService.signUp: ' + error);
    }
  } // signUp()

  static async signIn(data) {
    try {
      let emailValid = await Database('user')
        .where({ email: data.email })
        .first();
      if (!emailValid || !emailValid.id_user)
        return { status: 422, message: 'E-mail não encontrado!' };

      if (emailValid.status == 'NEW')
        return {
          status: 422,
          message:
            'Seu acesso ainda não foi autorizado! Confirme seu cadastro no link recebido por e-mail.',
        };

      if (emailValid.status == 'BLOCKED')
        return {
          status: 422,
          message:
            'Por motivo de segurança seu usuário está bloqueado. Entre em contato conosco!',
        };

      let user = {};
      if (emailValid.status == 'UPDATE')
        user = await Database('user')
          .where({ email: data.email, password: data.password })
          .orWhere({ email: data.email, temp_password: data.password })
          .first();
      else
        user = await Database('user')
          .where({ email: data.email, password: data.password })
          .first();

      if (!user || !user.id_user)
        return { status: 422, message: 'Senha incorreta!' };

      await Database('user').where({ email: user.email }).update({
        access_at: new Date(),
      });

      let token = TokenUtil.genereteToken({
        name: user.name,
        email: user.email,
        id_user: user.id_user,
        role: user.role,
      });

      let userFormatted = await this.loggedUserFormatter(user, token);

      return {
        status: 200,
        message: 'Acesso Autorizado.',
        user: userFormatted,
      };
    } catch (error) {
      throw new Error('RegisterService.signIn: ' + error);
    }
  } // signIn()

  static async recovery({ email }) {
    try {
      let user = await Database('user').where({ email: email }).first();

      if (!user || !user.id_user)
        return { status: 422, message: 'E-mail não encontrado!' };

      if (user.status == 'NEW')
        return {
          status: 422,
          message:
            'Seu acesso ainda não foi autorizado! Confirme seu cadastro no link recebido por e-mail.',
        };

      if (user.status == 'BLOCKED')
        return {
          status: 422,
          message:
            'Por motivo de segurança seu usuário está bloqueado. Entre em contato conosco!',
        };

      let password = generator.generate({
        length: 10,
        numbers: true,
      });

      await Database('user')
        .where({ email: email })
        .update({
          temp_password: md5(password),
          status: 'UPDATE',
        });

      user.temp_password = password;
      EmailService.recoveryNotify(user);

      return {
        status: 200,
        message:
          'Solicitação realizada! Você receberá a senha no e-mail informado.',
      };
    } catch (error) {
      throw new Error('RegisterService.recovery: ' + error);
    }
  } // recovery()

  static async emailUpdate(userData) {
    try {
      let user = await Database('user')
        .where({ email: userData.newEmail })
        .first();

      if (user && user.id_user)
        return { status: 422, message: 'E-mail vinculado a outro cadastro!' };

      EmailService.emailUpdateNotify(userData);

      return {
        status: 200,
        message:
          'Pedido de registro realizado! Você receberá a senha no e-mail informado.',
      };
    } catch (error) {
      throw new Error('RegisterService.emailUpdate: ' + error);
    }
  } // emailUpdate()

  static async emailUpdateConfirm(token) {
    try {
      let data = TokenUtil.decodeToken(token);

      console.log(data);

      if (!data || !data.user)
        return {
          message: `<h1 style="text-align: center">Não foi possível validar este e-mail. Entre em contato conosco!`,
        };

      let user = await Database('user')
        .where({ email: data.user.email })
        .first();

      if (!user || !user.id_user)
        return {
          message: `<h1 style="text-align: center">E-mail não encontrado!</h1>`,
        };

      if (user.status == 'BLOCKED')
        return {
          message: `<h1 style="text-align: center">Por motivo de segurança seu usuário está bloqueado. Entre em contato conosco!</h1>`,
        };

      if (user.email == data.user.newEmail)
        return {
          message: `<div style="text-align: center;">
                                <h1>Este e-mail já foi confirmado!</h1>
                                <a href='${admin}'>Clique aqui para realizar o login. </a>
                            </div>`,
        };

      await Database('user').where({ email: user.email }).update({
        email: data.user.newEmail,
      });

      return {
        message: `<div style="text-align: center;">
                                <h1>E-mail confirmado com sucesso!</h1>
                                <a href='${admin}'>Clique aqui para realizar o login. </a>
                            </div>`,
      };
    } catch (error) {
      throw new Error('RegisterService.emailUpdateConfirm: ' + error);
    }
  } // emailUpdateConfirm()

  static async emailConfirm(token) {
    try {
      let data = TokenUtil.decodeToken(token);

      if (!data || !data.user)
        return {
          message: `<h1 style="text-align: center">Não foi possível validar este e-mail. Entre em contato conosco!`,
        };

      let user = await Database('user')
        .where({ email: data.user.email })
        .first();

      if (!user || !user.id_user)
        return {
          message: `<h1 style="text-align: center">E-mail não encontrado!</h1>`,
        };

      if (user.status == 'BLOCKED')
        return {
          message: `<h1 style="text-align: center">Por motivo de segurança seu usuário está bloqueado. Entre em contato conosco!</h1>`,
        };
      if (user.status == 'ACTIVE')
        return {
          message: `<div style="text-align: center;">
                                <h1>Este e-mail já foi confirmado!</h1>
                                <a href='${admin}'>Clique aqui para realizar o login. </a>
                            </div>`,
        };

      await Database('user').where({ email: user.email }).update({
        confirm_at: new Date(),
        status: 'ACTIVE',
      });

      return {
        message: `<div style="text-align: center;">
                                <h1>E-mail confirmado com sucesso!</h1>
                                <a href='${admin}'>Clique aqui para realizar o login. </a>
                            </div>`,
      };
    } catch (error) {
      throw new Error('RegisterService.emailConfirm: ' + error);
    }
  } // emailConfirm()

  // Devolver usuario logado com token
  static async loggedUserFormatter(user, token) {
    return {
      id_user: user.id_user,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
      token: token,
    };
  } // loggedUserFormatter
}; // class
