'use strict';

const ImageController = require('../controllers/ImageController');
module.exports = class ImageRoute {
  constructor(app) {
    app.route('/assets/:fileName').get(ImageController.getImage);

    app
      .route('/upload/request/:id_request/:fileName')
      .get(ImageController.getRequestImage);

    app.route('/assets/icon/:area').get(ImageController.getIcon);

    app.route('/upload/:area').post(ImageController.postImageSite);

    app.route('/uploadvideo').post(ImageController.postVideoSite);

    app
      .route('/servicerequest/:id_request')
      .post(ImageController.postImageRequest);
    app.route('/upload/report/:id_request').post(ImageController.postReport);
  } // constructor()
}; // class
