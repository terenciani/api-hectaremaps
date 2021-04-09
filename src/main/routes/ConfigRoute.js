"use strict";

const ConfigController = require("../controllers/ConfigController");
module.exports = class ConfigRoute {
    constructor(app) {
        app.route("/configdata")
            .get(ConfigController.getData)
            .post(ConfigController.setData)
    } // constructor()
} // class