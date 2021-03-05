"use strict";

const ServiceController = require("../controllers/ServiceController");
module.exports = class ServiceRoute {
    constructor(app) {
        app.route("/service")
            .get(ServiceController.getList)
    } // constructor()
} // class