"use strict";

const Database = require("../database/Connection")

module.exports = class PlanService {

    static async getList() {
        try {
            return await Database("plan")
        } catch (error) {
            throw new Error("PlanService.getList: " + error);
        }
    } // getList()

    static async getFullList() {
        try {
            let plans = await Database('plan').where({ active: true })

            for (let i = 0; i < plans.length; i++) {
                let planItems = [];
                planItems = await Database('item_plan').where('fk_plan', '=', plans[i].id_plan).andWhere({ active: true })
                plans[i].plan_items = planItems
            }
            return plans
        } catch (error) {
            throw new Error("PlanService.getFullList: " + error);
        }
    } // getFullList()

    static async create({ name, price, number_of_images, storage_space, observation, active, months_of_validity }) {
        try {
            let row = await Database("plan").insert({
                name,
                price,
                number_of_images,
                storage_space,
                observation,
                active,
                months_of_validity
            })
            return row >=1 ? "Cadastro realizado com sucesso!" : "Não foi possível concluir o registro."
        } catch (error) {
            throw new Error("PlanService.create: " + error);
        }
    } // create()
    
    static async delete(plan) {
        try {
            await Database("item_plan").where({ fk_plan: plan.id_plan }).del();

            let row = await Database("plan").where({ id_plan: plan.id_plan }).del();

            return row >=1 ? "Exclusão realizada com sucesso!" : "Não foi possível excluir esse registro."
        } catch (error) {
            throw new Error("PlanService.delete: " + error);
        }
    } // delete()
    
    static async update(plan) {
        try {
            let row = await Database("plan").where({ id_plan: plan.id_plan }).update({
                name: plan.name,
                price: plan.price,
                number_of_images: plan.number_of_images,
                storage_space: plan.storage_space,
                observation: plan.observation,
                site_emphasis: plan.site_emphasis,
                active: plan.active,
                months_of_validity: plan.months_of_validity
            });
            return row >=1 ? "Atualização realizada com sucesso!" : "Não foi possível atualizar esse registro."
        } catch (error) {
            throw new Error("PlanService.update: " + error);
        }
    } // update()
    
    static async getItemsByPlan(id_plan) {
        try {
            let planItems = await Database('item_plan').where('fk_plan', '=', id_plan)
            return planItems
        } catch (error) {
            throw new Error("PlanService.getItemsByPlan: " + error);
        }
    } // getItemsByPlan()

    static async deletePlanItem(planItem) {
        try {
            let row = await Database("item_plan").where({ id_item_plan: planItem.id_item_plan }).del();
            return row >=1 ? "Exclusão realizada com sucesso!" : "Não foi possível excluir esse registro."
        } catch (error) {
            throw new Error("PlanService.deletePlanItem: " + error);
        }
    } // deletePlanItem()

    static async updatePlanItem(planItem) {
        try {
            let row = await Database("item_plan").where({ id_item_plan: planItem.id_item_plan }).update({
                description: planItem.description,
                quantity: planItem.quantity,
                price: planItem.price,
                unit: planItem.unit,
                active: planItem.active
            });
            return row >=1 ? "Atualização realizada com sucesso!" : "Não foi possível atualizar esse registro."
        } catch (error) {
            throw new Error("PlanService.updatePlanItem: " + error);
        }
    } // updatePlanItem()
    
    static async createPlanItem({ description, quantity, price, unit, active, fk_plan }) {
        try {
            let row = await Database("item_plan").insert({
                description,
                quantity,
                price,
                unit,
                active,
                fk_plan
            })
            return row >=1 ? "Cadastro realizado com sucesso!" : "Não foi possível concluir o registro."
        } catch (error) {
            throw new Error("PlanService.createPlanItem: " + error);
        }
    } // createPlanItem()
} // class