"use strict";

const EmailController = require("../controllers/EmailController");
module.exports = class EmaileRoute {
    constructor(app) {
        app.route("/email")
            .post(EmailController.contactNotify)
    } // constructor()
} // class