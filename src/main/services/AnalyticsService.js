'use strict';

const Database = require('../database/Connection');
module.exports = class AnalyticsService {
  static async getUserAnalytics() {
    try {
      let active = await Database('user')
        .count({ data: 'status' })
        .where({ status: 'ACTIVE' })
        .first();

      let newUsers = await Database('user')
        .count({ data: 'status' })
        .where({ status: 'NEW' })
        .first();

      let blocked = await Database('user')
        .count({ data: 'status' })
        .where({ status: 'BLOCKED' })
        .first();

      let update = await Database('user')
        .count({ data: 'status' })
        .where({ status: 'UPDATE' })
        .first();
      return {
        active: active.data,
        new: newUsers.data,
        update: update.data,
        blocked: blocked.data,
      };
    } catch (error) {
      throw new Error('ConfigService.getUserAnalytics: ' + error);
    }
  }
  static async getPlanAnalytics() {
    try {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let today = await Database('plan_contract')
        .count({ data: 'id_plan_contract' })
        .where('contract_date', '>=', date)
        .first();

      let users = await Database('plan_contract')
        .countDistinct({
          data: 'fk_user',
        })
        .first();

      let active = await Database('plan_contract')
        .count({
          data: 'id_plan_contract',
        })
        .whereNull('finish_date')
        .first();

      let total = await Database('plan_contract')
        .count({
          data: 'id_plan_contract',
        })
        .first();

      let nusers = await Database('user')
        .countDistinct({
          data: 'id_user',
        })
        .whereNotExists(function () {
          this.select('*')
            .from('plan_contract')
            .whereRaw('plan_contract.fk_user = user.id_user');
        })
        .first();

      return {
        today: today.data,
        users: users.data,
        nusers: nusers.data,
        active: active.data,
        total: total.data,
      };
    } catch (error) {
      throw new Error('ConfigService.getPlanAnalytics: ' + error);
    }
  }
  static async getRequestAnalytics() {
    try {
      let created = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'CREATED' })
        .first();

      let processing = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'PROCESSING' })
        .first();

      let finished = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'FINISHED' })
        .first();

      let attached = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'ATTACHED' })
        .first();
      return {
        created: created.data,
        processing: processing.data,
        finished: finished.data,
        attached: attached.data,
      };
    } catch (error) {
      throw new Error('ConfigService.getRequestAnalytics: ' + error);
    }
  }
  static async getUserRequestsAnalytics(userId) {
    try {
      let created = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'CREATED', fk_user: userId })
        .first();

      let processing = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'PROCESSING', fk_user: userId })
        .first();

      let finished = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'FINISHED', fk_user: userId })
        .first();

      let attached = await Database('request')
        .count({ data: 'status' })
        .where({ status: 'ATTACHED', fk_user: userId })
        .first();
      return {
        created: created.data,
        processing: processing.data,
        finished: finished.data,
        attached: attached.data,
      };
    } catch (error) {
      throw new Error('ConfigService.getRequestAnalytics: ' + error);
    }
  }
}; // class
