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
  
  static async getItemsByPlan(req, res) {
    try {        
      res.status(200).send(await PlanService.getItemsByPlan(req.params.id_plan));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.getItemsByPlan " + e.message);
    }
  } // getItemsByPlan()

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
  static async delete(req, res) {
    try {
      res.status(200).send(await PlanService.delete(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.delete " + e.message);
    }
  } // delete()
  static async update(req, res) {
    try {
      res.status(200).send(await PlanService.update(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.update " + e.message);
    }
  } // update()
  static async deletePlanItem(req, res) {
    try {
      res.status(200).send(await PlanService.deletePlanItem(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.deletePlanItem " + e.message);
    }
  } // deletePlanItem()
  static async createPlanItem(req, res) {
    try {
      res.status(200).send(await PlanService.createPlanItem(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.createPlanItem " + e.message);
    }
  } // createPlanItem()
  static async updatePlanItem(req, res) {
    try {
      res.status(200).send(await PlanService.updatePlanItem(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("PlanController.updatePlanItem " + e.message);
    }
  } // updatePlanItem()
}; // class