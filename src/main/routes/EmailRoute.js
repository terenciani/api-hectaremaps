"use strict";

const EmailController = require("../controllers/EmailController");
module.exports = class ServiceRoute {
    constructor(app) {
        app.route("/email")
            .post(EmailController.send)
    } // constructor()
} // class