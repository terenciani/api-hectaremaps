"use strict";

const jsonfile = require('jsonfile')
const siteSettings = './configuration.json';

module.exports = class ConfigService {

    static async getData() {
        try {
            let data = await jsonfile.readFileSync(siteSettings)
            return data
        } catch (error) {
            throw new Error("ConfigService.getData: " + error);
        }
    } // getData()
    static async setData(json) {
        try {
            await jsonfile.writeFileSync(siteSettings, json, { spaces: 2 })
            return { status: 200, message: "As informações do site foram atualizadas!" }
        } catch (error) {
            throw new Error("ConfigService.setData: " + error);
        }
    } // setData()
} // class