'use strict';

const EmailService = require('../services/EmailService');

module.exports = class ContactController {
  static async contactNotify(req, res) {
    try {
      res.status(200).send(await EmailService.contactNotify(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ContactController.send ' + e.message);
    }
  } // contactNotify()
}; // class
