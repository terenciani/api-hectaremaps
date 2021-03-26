"use strict";

const UserController = require("../controllers/UserController");
module.exports = class UserRoute {
    constructor(app) {
        app.route("/users")
            .get(UserController.getAll)
            .delete(UserController.delete)
            .post(UserController.create)
            .put(UserController.update)
    } // constructor()
} // class