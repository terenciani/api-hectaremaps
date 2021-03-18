"use strict";

const SiteService = require("../services/SiteService");

module.exports = class SiteController {
  static async getData(req, res) {
    try {        
      res.status(200).send(await SiteService.getData());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("SiteController.getData " + e.message);
    }
  } // getData()
  static async setData(req, res) {
    try {        
      res.status(200).send(await SiteService.setData(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("SiteController.setData " + e.message);
    }
  } // setData()
}; // class