'use strict';
const AccessControl = require('../middlewares/AccessControl');

const access = new AccessControl('USER');
const accessAdmin = new AccessControl('ADMIN');

const AnalyticsController = require('../controllers/AnalyticsController');
module.exports = class PlanRoute {
  constructor(app) {
    app
      .route('/analytics/users')
      .get(accessAdmin.verify, AnalyticsController.getUserAnalytics);
    app
      .route('/analytics/plans')
      .get(accessAdmin.verify, AnalyticsController.getPlanAnalytics);
    app
      .route('/analytics/requests')
      .get(accessAdmin.verify, AnalyticsController.getRequestAnalytics);

    app
      .route('/analytics/users/:id_user')
      .get(access.verify, AnalyticsController.getUserRequestsAnalytics);
  } // constructor()
}; // class
// accessAdmin.verify,
