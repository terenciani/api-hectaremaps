"use strict";

const PlanService = require("../services/PlanService");

module.exports = class PlanController {
  static async getList(req, res) {
    try {        
      res.status(200).send(await PlanService.getList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.getList " + e.message);
    }
  } // getList()
  
  static async getFullList(req, res) {
    try {        
      res.status(200).send(await PlanService.getFullList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.getFullList " + e.message);
    }
  } // getFullList()
  
  static async create(req, res) {
    try {
      res.status(200).send(await PlanService.create(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.create " + e.message);
    }
  } // create()
}; // class