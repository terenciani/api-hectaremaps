"use strict";

const RegisterController = require("../controllers/RegisterController");
module.exports = class RegisterRoute {
    constructor(app) {
        app.route("/signup")
            .post(RegisterController.signUp)
        
        app.route("/signin")
            .post(RegisterController.signIn)

        app.route("/recovery")
            .post(RegisterController.recovery)
        
        app.route("/emailconfirm/:token")
            .get(RegisterController.emailConfirm)
        
        app.route("/emailupdateconfirm/:token")
            .get(RegisterController.emailUpdateConfirm)

        app.route("/validate-token/:token")
            .get(RegisterController.validateIfTokenIsValid)
    } // constructor()
} // class