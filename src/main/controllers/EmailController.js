"use strict";

const EmailService = require("../services/EmailService");

module.exports = class EmailController {
  static async send(req, res) {
    try {        
      res.status(200).send(await EmailService.send(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("EmailController.send " + e.message);
    }
  } // send()
}; // class