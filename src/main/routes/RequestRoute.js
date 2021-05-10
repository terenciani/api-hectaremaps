'use strict';
const AccessControl = require('../middlewares/AccessControl');

const access = new AccessControl('USER');
const accessAdmin = new AccessControl('ADMIN');

const RequestController = require('../controllers/RequestController');
module.exports = class RequestRoute {
  constructor(app) {
    app
      .route('/request')
      .get(accessAdmin.verify, RequestController.getAllRequests)
      .put(access.verify, RequestController.update)
      .post(access.verify, RequestController.createRequest)
      .delete(access.verify, RequestController.cancelRequest);

    app
      .route('/request/:id_user')
      .get(access.verify, RequestController.getRequestActivesByUser);

    app
      .route('/request/data/:id_request')
      .get(access.verify, RequestController.getRequestData);

    app
      .route('/request/zip/:id_request')
      .get(accessAdmin.verify, RequestController.getFileZip);

    app
      .route('/request/all/:id_user')
      .get(access.verify, RequestController.getAllUserRequests);

    app
      .route('/request/images/:id_request')
      .get(RequestController.getImagesByRequest);
  } // constructor()
}; // class
