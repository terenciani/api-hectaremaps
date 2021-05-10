'use strict';

const ContactController = require('../controllers/ContactController');
module.exports = class ContactRoute {
  constructor(app) {
    app.route('/email').post(ContactController.contactNotify);
  } // constructor()
}; // class
