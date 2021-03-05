"use strict";

const ServiceService = require("../services/ServiceService");

module.exports = class AssociateController {
  static async getList(req, res) {
    try {        
      res.status(200).send(await ServiceService.getList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ServiceController.getList " + e.message);
    }
  } // findAll()
  
  
  static async getOne(req, res) {
    try {
      res.status(200).send(await ServiceService.findOne(req.params));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ServiceController.getOne " + e.message);
    }
  } // findOne()
}; // class