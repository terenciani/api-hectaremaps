"use strict";

const Md5Controller = require("../controllers/Md5Controller");
module.exports = class Md5Route {
    constructor(app) {
        app.route("/md5/:string")
            .get(Md5Controller.md5)
    } // constructor()
} // class