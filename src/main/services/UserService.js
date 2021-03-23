"use strict";

const md5 = require('md5');
const EmailService = require("./EmailService");
const TokenUtil = require("../utils/TokenUtil");
const generator = require('generate-password');
const Database = require("../database/Connection");

module.exports = class UserService {
    static async getAll() {
        try {
            return await Database("user")
        } catch (error) {
            throw new Error("UserService.getAll: " + error);
        }
    } // getAll()
} // class
