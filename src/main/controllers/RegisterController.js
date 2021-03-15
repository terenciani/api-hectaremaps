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
}; // class