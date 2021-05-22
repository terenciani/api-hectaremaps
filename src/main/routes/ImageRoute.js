'use strict';
const AccessControl = require('../middlewares/AccessControl');

const access = new AccessControl('USER');
const accessAdmin = new AccessControl('ADMIN');
const ImageController = require('../controllers/ImageController');
module.exports = class ImageRoute {
  constructor(app) {
    app.route('/assets/:fileName').get(ImageController.getImage);

    app.route('/assets/icon/:area').get(ImageController.getIcon);

    // transformar em rota privada
    app
      .route('/upload/request/:id_request/:fileName')
      .get(ImageController.getAzureBlob);

    app
      .route('/upload/:area')
      .post(accessAdmin.verify, ImageController.postImageSite);

    app
      .route('/uploadvideo')
      .post(accessAdmin.verify, ImageController.postVideoSite);

    app
      .route('/servicerequest/:id_request')
      .post(access.verify, ImageController.postImageRequest);

    app
      .route('/servicerequest/big/:id_request')
      .post(access.verify, ImageController.postBlobRequest);

    app
      .route('/servicerequest/local/:id_request')
      .post(access.verify, ImageController.postLocalRequest);

    app
      .route('/upload/report/:id_request')
      .post(accessAdmin.verify, ImageController.postBlobReport);
  } // constructor()
}; // class
