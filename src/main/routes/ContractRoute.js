'use strict';
const AccessControl = require('../middlewares/AccessControl');

// const access = new AccessControl('USER')
const accessAdmin = new AccessControl('ADMIN');

const ContractController = require('../controllers/ContractController');
module.exports = class ContractRoute {
  constructor(app) {
    app
      .route('/contract')
      .get(ContractController.getContractList)
      .post(ContractController.contract)
      .put(ContractController.confirmContract)
      .delete(ContractController.finishContract);

    app.route('/contract/delete').delete(ContractController.deleteContract);

    app
      .route('/contract/:id_user')
      .get(ContractController.getContractListByUser);

    app
      .route('/contract/current/:id_user')
      .get(ContractController.getContractCurrentByUser);

    app
      .route('/contract/all/:id_user')
      .get(ContractController.getAllContractsByUser);
  } // constructor()
}; // class
