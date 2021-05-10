'use strict';

const AnalyticsService = require('../services/AnalyticsService');

module.exports = class AnalyticsController {
  static async getUserAnalytics(req, res) {
    try {
      res.status(200).send(await AnalyticsService.getUserAnalytics());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('AnalyticsController.getUserAnalytics ' + e.message);
    }
  } // getUserAnalytics()

  static async getUserRequestsAnalytics(req, res) {
    try {
      res
        .status(200)
        .send(
          await AnalyticsService.getUserRequestsAnalytics(req.params.id_user)
        );
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'AnalyticsController.getUserRequestsAnalytics ' + e.message
      );
    }
  } // getUserRequestsAnalytics()

  static async getPlanAnalytics(req, res) {
    try {
      res.status(200).send(await AnalyticsService.getPlanAnalytics());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('AnalyticsController.getPlanAnalytics ' + e.message);
    }
  } // getPlanAnalytics()
  static async getRequestAnalytics(req, res) {
    try {
      res.status(200).send(await AnalyticsService.getRequestAnalytics());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'AnalyticsController.getRequestAnalytics ' + e.message
      );
    }
  } // getRequestAnalytics()
}; // class
