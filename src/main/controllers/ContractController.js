'use strict';

const ContractService = require('../services/ContractService');

module.exports = class ContractController {
  static async getContractList(req, res) {
    try {
      res.status(200).send(await ContractService.getContractList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ContractController.getContractList ' + e.message);
    }
  } // getContractList()

  static async getContractListByUser(req, res) {
    try {
      res
        .status(200)
        .send(await ContractService.getContractList(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'ContractController.getContractListByUser ' + e.message
      );
    }
  } // getContractListByUser()

  static async getContractCurrentByUser(req, res) {
    try {
      res
        .status(200)
        .send(
          await ContractService.getContractCurrentByUser(req.params.id_user)
        );
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'ContractController.getContractCurrentByUser ' + e.message
      );
    }
  } // getContractListByUser()

  static async getAllContractsByUser(req, res) {
    try {
      res
        .status(200)
        .send(await ContractService.getAllContractsByUser(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'ContractController.getAllContractsByUser ' + e.message
      );
    }
  } // getContractListByUser()
  static async contract(req, res) {
    try {
      res.status(200).send(await ContractService.contract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ContractController.contract ' + e.message);
    }
  } // contract()

  static async finishContract(req, res) {
    try {
      res.status(200).send(await ContractService.finishContract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ContractController.finishContract ' + e.message);
    }
  } // finishContract()

  static async deleteContract(req, res) {
    try {
      res.status(200).send(await ContractService.deleteContract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ContractController.deleteContract ' + e.message);
    }
  } // deleteContract()

  static async confirmContract(req, res) {
    try {
      res.status(200).send(await ContractService.confirmContract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ContractController.confirmContract ' + e.message);
    }
  } // confirmContract()
}; // class
