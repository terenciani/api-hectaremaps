"use strict";

const HomeService = require("../services/HomeService");

module.exports = class HomeController {
  static async getData(req, res) {
    try {        
      res.status(200).send(await HomeService.getData());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("HomeService.getData " + e.message);
    }
  } // getData()
}; // class