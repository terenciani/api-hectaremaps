"use strict";

const Database = require("../database/Connection")

module.exports = class PlanService {

    static async getList() {
        try {
            return await Database.select("*").table("plan")
        } catch (error) {
            throw new Error("PlanService.getList: " + error);
        }
    } // getList()

    static async getFullList() {
        try {
            return await Database('plan')
            .leftJoin('item_plan', 'plan.id_plan', 'item_plan.fk_plan')
        } catch (error) {
            throw new Error("PlanService.getFullList: " + error);
        }
    } // getFullList()


    static async create({name, description, image, price}) {
        try {
            return await Database("plan").insert({
                name, 
                description, 
                image, 
                price
            })
        } catch (error) {
            throw new Error("PlanService.create: " + error);
        }
    } // create()
} // class