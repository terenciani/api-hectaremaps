'use strict';
const AccessControl = require('../middlewares/AccessControl');

const access = new AccessControl('USER');
const accessAdmin = new AccessControl('ADMIN');

const ContractController = require('../controllers/ContractController');
module.exports = class ContractRoute {
  constructor(app) {
    app
      .route('/contract')
      .get(accessAdmin.verify, ContractController.getContractList)
      .post(access.verify, ContractController.contract)
      .put(accessAdmin.verify, ContractController.confirmContract)
      .delete(accessAdmin.verify, ContractController.finishContract);

    app
      .route('/contract/delete')
      .delete(access.verify, ContractController.deleteContract);

    app
      .route('/contract/:id_user')
      .get(access.verify, ContractController.getContractListByUser);

    app
      .route('/contract/current/:id_user')
      .get(access.verify, ContractController.getContractCurrentByUser);

    app
      .route('/contract/all/:id_user')
      .get(access.verify, ContractController.getAllContractsByUser);
  } // constructor()
}; // class
