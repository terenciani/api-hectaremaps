'use strict';
const AccessControl = require('../middlewares/AccessControl');

const accessAdmin = new AccessControl('ADMIN');
const ConfigController = require('../controllers/ConfigController');
module.exports = class ConfigRoute {
  constructor(app) {
    app
      .route('/configdata')
      .get(accessAdmin.verify, ConfigController.getData)
      .post(accessAdmin.verify, ConfigController.setData);

    app.route('/publicdata').get(ConfigController.getPublicData);
  } // constructor()
}; // class
