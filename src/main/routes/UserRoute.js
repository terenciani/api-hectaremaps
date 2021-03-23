"use strict";

const UserController = require("../controllers/UserController");
module.exports = class UserRoute {
    constructor(app) {
        app.route("/users")
            .get(UserController.getAll)
    } // constructor()
} // class