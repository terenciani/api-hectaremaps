"use strict";

const SiteController = require("../controllers/SiteController");
module.exports = class SiteRoute {
    constructor(app) {
        app.route("/sitedata")
            .get(SiteController.getData)
            .post(SiteController.setData)
    } // constructor()
} // class