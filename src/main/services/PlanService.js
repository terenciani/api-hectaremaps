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
            let plans = await Database('plan')
            
            for (let i = 0; i < plans.length; i++) {
                let planItems = [];
                planItems = await Database('item_plan').where('fk_plan', '=', plans[i].id_plan)
                plans[i].plan_items = planItems   
            }
            return plans
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