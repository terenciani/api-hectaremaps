'use strict';

const ServiceService = require('../services/ServiceService');

module.exports = class ServiceController {
  static async getList(req, res) {
    try {
      res.status(200).send(await ServiceService.getList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ServiceController.getList ' + e.message);
    }
  } // getList()

  static async getActives(req, res) {
    try {
      res.status(200).send(await ServiceService.getActives());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ServiceController.getActives ' + e.message);
    }
  } // getActives()

  static async create(req, res) {
    try {
      await ServiceService.create(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ServiceController.create ' + e.message);
    }
  } // create()

  static async delete(req, res) {
    try {
      res.status(200).send(await ServiceService.delete(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'PlanCServiceControllerontroller.delete ' + e.message
      );
    }
  } // delete()
  static async update(req, res) {
    try {
      await ServiceService.update(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ServiceController.update ' + e.message);
    }
  } // update()
}; // class
