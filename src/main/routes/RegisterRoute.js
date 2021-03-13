"use strict";

const RegisterController = require("../controllers/RegisterController");
module.exports = class RegisterRoute {
    constructor(app) {
        app.route("/signup")
            .post(RegisterController.signUp)
        
        app.route("/signin")
            .post(RegisterController.signIn)
    } // constructor()
} // class