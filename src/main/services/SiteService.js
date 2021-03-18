"use strict";

const jsonfile = require('jsonfile')
const siteSettings = './site-settings.json';

module.exports = class SiteService {

    static async getData() {
        try {
            let data = await jsonfile.readFileSync(siteSettings)
            return data
        } catch (error) {
            throw new Error("SiteService.getData: " + error);
        }
    } // getData()
    static async setData(json) {
        try {
            await jsonfile.writeFileSync(siteSettings, json, { spaces: 2 })
            return { status: 200, message: "As informações do site foram atualizadas!" }
        } catch (error) {
            throw new Error("SiteService.setData: " + error);
        }
    } // setData()
} // class