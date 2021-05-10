'use strict';

const jsonfile = require('jsonfile');
const siteSettings = './configuration.json';

module.exports = class ConfigService {
  static async getData() {
    try {
      let data = await jsonfile.readFileSync(siteSettings);
      return data;
    } catch (error) {
      throw new Error('ConfigService.getData: ' + error);
    }
  } // getData()
  static async getPublicData() {
    try {
      let {
        hero,
        icon,
        about,
        service,
        plan,
        video,
        contact,
        api,
        admin,
        company,
      } = await jsonfile.readFileSync(siteSettings);
      return {
        icon: icon,
        hero: hero,
        about: about,
        service: service,
        plan: plan,
        video: video,
        contact: contact,
        api: api,
        admin: admin,
        company: company,
      };
    } catch (error) {
      throw new Error('ConfigService.getPublicData: ' + error);
    }
  } // getPublicData()
  static async setData(json) {
    try {
      await jsonfile.writeFileSync(siteSettings, json, { spaces: 2 });
      return {
        status: 200,
        message: 'As informações do site foram atualizadas!',
      };
    } catch (error) {
      throw new Error('ConfigService.setData: ' + error);
    }
  } // setData()
}; // class
