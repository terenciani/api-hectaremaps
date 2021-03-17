"use strict";

const HomeController = require("../controllers/HomeController");
module.exports = class HomeRoute {
    constructor(app) {
        app.route("/homedata")
            .get(HomeController.getData)
    } // constructor()
} // class