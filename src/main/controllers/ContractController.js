"use strict";

const ContractService = require("../services/ContractService");

module.exports = class ContractController {
  
  static async getContractList(req, res) {
    try {        
      res.status(200).send(await ContractService.getContractList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.getContractList " + e.message);
    }
  } // getContractList()
  
  static async getContractListByUser(req, res) {
    try {        
      res.status(200).send(await ContractService.getContractList(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.getContractListByUser " + e.message);
    }
  } // getContractListByUser()

  static async getContractCurrentByUser(req, res) {
    try {        
      res.status(200).send(await ContractService.getContractCurrentByUser(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.getContractCurrentByUser " + e.message);
    }
  } // getContractListByUser()

  static async contract(req, res) {
    try {
      res.status(200).send(await ContractService.contract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.contract " + e.message);
    }
  } // contract()

  static async deleteContract(req, res) {
    try {
      res.status(200).send(await ContractService.deleteContract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.deleteContract " + e.message);
    }
  } // deleteContract()
  static async updateContract(req, res) {
    try {
      res.status(200).send(await ContractService.updateContract(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.updateContract " + e.message);
    }
  } // updateContract()
}; // class