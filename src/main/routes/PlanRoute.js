"use strict";

const PlanController = require("../controllers/PlanController");
module.exports = class ServiceRoute {
    constructor(app) {
        app.route("/plan")
            .get(PlanController.getList)
            .post(PlanController.create)
        
        app.route("/plansanditems")
            .get(PlanController.getFullList)
    } // constructor()
} // class