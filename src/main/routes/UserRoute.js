"use strict";
const AccessControl = require("../middlewares/AccessControl");

// const access = new AccessControl('USER')
const accessAdmin = new AccessControl('ADMIN')

const UserController = require("../controllers/UserController");
module.exports = class UserRoute {
    constructor(app) {
        app.route("/users")
            .get(accessAdmin.verify, UserController.getAll)
            .delete(accessAdmin.verify, UserController.delete)
            .post(accessAdmin.verify, UserController.create)
            .put(accessAdmin.verify, UserController.update)
    } // constructor()
} // class