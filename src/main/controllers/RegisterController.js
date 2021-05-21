"use strict";

const RegisterService = require("../services/RegisterService");

module.exports = class RegisterController {
  static async signUp(req, res) {
    try {
      res.status(200).send(await RegisterService.signUp(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("RegisterController.signUp " + e.message);
    }
  } // signUp()

  static async signIn(req, res) {
    try {
      res.status(200).send(await RegisterService.signIn(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("RegisterController.signIn " + e.message);
    }
  } // signIn()

  static async recovery(req, res) {
    try {
      res.status(200).send(await RegisterService.recovery(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("RegisterController.recovery " + e.message);
    }
  } // recovery()
  static async emailConfirm(req, res) {
    try {
      if (!req.params.token) throw new Error("Ocorreu um erro ao validar seu e-mail. Entre em contato conosco!");
      let { message } = await RegisterService.emailConfirm(req.params.token);
      res.set('Content-Type', 'text/html');
      res.status(200).send(Buffer.from(message));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("RegisterController.emailConfirm " + e.message);
    }
  } // emailConfirm()

  static async emailUpdateConfirm(req, res) {
    try {
      if (!req.params.token) throw new Error("Ocorreu um erro ao validar seu e-mail. Entre em contato conosco!");
      let { message } = await RegisterService.emailUpdateConfirm(req.params.token);
      res.set('Content-Type', 'text/html');
      res.status(200).send(Buffer.from(message));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("RegisterController.emailUpdateConfirm " + e.message);
    }
  } // emailUpdateConfirm()

  static validateIfTokenIsValid(req, res) {
    const { token } = req.params;
    if(!token) return res.status(401).send({ isValid: false });

    const isValid = RegisterService.isValidToken(token);
    return res.status(200).send({ isValid });
  }


}; // class