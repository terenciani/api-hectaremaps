"use strict";

const ImageController = require("../controllers/ImageController");
module.exports = class ImageRoute {
    constructor(app) {
        app.route("/assets/:fileName")
            .get(ImageController.getImage)
    } // constructor()
} // class