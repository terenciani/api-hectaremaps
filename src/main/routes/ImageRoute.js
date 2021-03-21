"use strict";

const ImageController = require("../controllers/ImageController");
module.exports = class ImageRoute {
    constructor(app) {
        app.route("/assets/:fileName")
            .get(ImageController.getImage)
        
        app.route("/upload/:area")
            .post(ImageController.postImageSite)
        
        app.route("/uploadvideo")
            .post(ImageController.postVideoSite)
    } // constructor()
} // class