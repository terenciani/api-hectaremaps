"use strict";

const Database = require("../database/Connection")

module.exports = class ServiceService {

    static async getList() {
        try {
            return await Database.select("*").table("service")
        } catch (error) {
            throw new Error("ServiceService.getList: " + error);
        }
    } // getList()

    static async create({name, description, image, price}) {
        try {
            return await Database("service").insert({
                name, 
                description, 
                image, 
                price
            })
        } catch (error) {
            throw new Error("ServiceService.create: " + error);
        }
    } // getList()

    static async findOne(params) {
        
    } // findOne
} // class