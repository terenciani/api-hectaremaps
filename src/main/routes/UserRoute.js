'use strict';
const AccessControl = require('../middlewares/AccessControl');

const access = new AccessControl('USER');
const accessAdmin = new AccessControl('ADMIN');

const UserController = require('../controllers/UserController');
module.exports = class UserRoute {
  constructor(app) {
    app
      .route('/users')
      .get(accessAdmin.verify, UserController.getAll)
      .delete(accessAdmin.verify, UserController.delete)
      .post(accessAdmin.verify, UserController.create)
      .put(accessAdmin.verify, UserController.update);

    app.route('/users/:id_user').get(access.verify, UserController.getUserData);

    app
      .route('/users/registration')
      .put(access.verify, UserController.registrationUpdate);

    app.route('/emailupdate').post(access.verify, UserController.emailUpdate);

    app
      .route('/passwordupdate')
      .post(access.verify, UserController.passwordUpdate);
  } // constructor()
}; // class
