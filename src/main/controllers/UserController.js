"use strict";

const UserService = require("../services/UserService");

module.exports = class UserController {
  static async getAll(req, res) {
    try {
      res.status(200).send(await UserService.getAll());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.getAll " + e.message);
    }
  } // getAll()
}; // class