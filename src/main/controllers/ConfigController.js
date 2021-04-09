"use strict";

const ConfigService = require("../services/ConfigService");

module.exports = class ConfigController {
  static async getData(req, res) {
    try {        
      res.status(200).send(await ConfigService.getData());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ConfigController.getData " + e.message);
    }
  } // getData()
  static async setData(req, res) {
    try {        
      res.status(200).send(await ConfigService.setData(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ConfigController.setData " + e.message);
    }
  } // setData()
}; // class