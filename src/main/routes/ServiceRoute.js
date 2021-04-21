'use strict';
const AccessControl = require('../middlewares/AccessControl');
const accessAdmin = new AccessControl('ADMIN');

const ServiceController = require('../controllers/ServiceController');
module.exports = class ServiceRoute {
  constructor(app) {
    app
      .route('/service')
      .get(accessAdmin.verify, ServiceController.getList)
      .post(accessAdmin.verify, ServiceController.create)
      .put(accessAdmin.verify, ServiceController.update)
      .delete(accessAdmin.verify, ServiceController.delete);

    app.route('/service/actives').get(ServiceController.getActives);
  } // constructor()
}; // class
