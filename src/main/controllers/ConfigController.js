'use strict';

const ConfigService = require('../services/ConfigService');
const helpers = require('../helpers/index');
module.exports = class ConfigController {
  static async getData(req, res) {
    try {
      res.status(200).send(await ConfigService.getData());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ConfigController.getData ' + e.message);
    }
  } // getData()
  static async getPublicData(req, res) {
    try {
      res.status(200).send(await ConfigService.getPublicData());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ConfigController.getPublicData ' + e.message);
    }
  } // getPublicData()
  static async setData(req, res) {
    try {
      res.status(200).send(await ConfigService.setData(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ConfigController.setData ' + e.message);
    }
  } // setData()

  static getHelpers(req, res) {
    return res.status(helpers.httpStatusCode.OK).send(helpers.enumHelper)
  }
}; // class
