'use strict';
const AccessControl = require('../middlewares/AccessControl');

const access = new AccessControl('USER');
const accessAdmin = new AccessControl('ADMIN');

const PlanController = require('../controllers/PlanController');
module.exports = class PlanRoute {
  constructor(app) {
    app
      .route('/plan')
      .get(accessAdmin.verify, PlanController.getList)
      .post(accessAdmin.verify, PlanController.create)
      .put(accessAdmin.verify, PlanController.update)
      .delete(accessAdmin.verify, PlanController.delete);

    app
      .route('/planitems/:id_plan')
      .get(access.verify, PlanController.getItemsByPlan);

    app
      .route('/planitems')
      .delete(accessAdmin.verify, PlanController.deletePlanItem)
      .post(accessAdmin.verify, PlanController.createPlanItem)
      .put(accessAdmin.verify, PlanController.updatePlanItem);

    app.route('/plansanditems').get(PlanController.getFullList);
  } // constructor()
}; // class
