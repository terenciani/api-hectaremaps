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
  static async getUserData(req, res) {
    try {        
      res.status(200).send(await UserService.findById(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.getUserData " + e.message);
    }
  } // getUserData()
  static async delete(req, res) {
    try {
      if (!req.body.id_user)
        throw new Error("A identificação do usuário deve ser informada.");

      res.status(200).send(await UserService.delete(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.delete " + e.message);
    }
  } // delete()
  static async create(req, res) {
    try {
      res.status(200).send(await UserService.create(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.create " + e.message);
    }
  } // create()
  static async update(req, res) {
    try {
      res.status(200).send(await UserService.update(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.update " + e.message);
    }
  } // update()
  static async registrationUpdate(req, res) {
    try {
      res.status(200).send(await UserService.registrationUpdate(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.registrationUpdate " + e.message);
    }
  } // registrationUpdate()
}; // class