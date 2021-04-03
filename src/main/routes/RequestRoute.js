"use strict";
const AccessControl = require("../middlewares/AccessControl");

// const access = new AccessControl('USER')
const accessAdmin = new AccessControl('ADMIN')

const RequestController = require("../controllers/RequestController");
module.exports = class RequestRoute {
    constructor(app) {

        app.route("/request")
            .post(RequestController.createRequest)
            .delete(RequestController.cancelRequest)
        
        app.route("/request/:id_user")
            .get(RequestController.getRequestActivesByUser)
        
        app.route("/request/all/:id_user")
            .get(RequestController.getAllUserRequests)
        
        app.route("/request/images/:id_request")
            .get(RequestController.getImagesByRequest)
        
    } // constructor()
} // class