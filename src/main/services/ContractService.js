"use strict";

const Database = require("../database/Connection")

module.exports = class ContractService {

    static async getContractList() {
        try {
            return await Database("plan_contract").select('id_plan_contract', 'fk_plan', 'fk_user', 'contract_date', 'expires_in', 'confirm_date', 'finish_date', 'email', 'plan.name')
                .innerJoin('plan', 'plan_contract.fk_plan', '=', 'plan.id_plan')
                .innerJoin('user', 'plan_contract.fk_user', '=', 'user.id_user')
        } catch (error) {
            throw new Error("ContractService.getContractList: " + error);
        }
    } // getContractList()
   
    static async contract({ plan, user}) {
        try {
            
            let row = await Database("plan_contract").insert({
                fk_plan: plan.id_plan,
                fk_user: user.id_user,
                contract_date: new Date()
            })
            return row >=1 ? "Sua solicitação foi realizada com sucesso!" : "Não foi possível concluir sua solicitação."
        } catch (error) {
            throw new Error("ContractService.contract: " + error);
        }
    } // create()
    
    static async confirmContract(planContract) {
        
        try {
            let date = new Date();
            let expires = new Date();
            let plan = await Database("plan").where({ id_plan: planContract.fk_plan }).first()
            
            expires.setMonth(date.getMonth() + plan.months_of_validity)
            let row = await Database("plan_contract").where({ id_plan_contract: planContract.id_plan_contract }).update({
                confirm_date: date,
                expires_in: expires
            });
            return row >=1 ? "Confirmação realizada com sucesso!" : "Não foi possível realizar essa operação."
        } catch (error) {
            throw new Error("ContractService.confirmContract: " + error);
        }
    } // confirmContract()

    static async finishContract(planContract) {
        
        try {
            let row = await Database("plan_contract").where({ id_plan_contract: planContract.id_plan_contract }).update({
                finish_date: new Date()
            });
            return row >=1 ? "Finalização realizada com sucesso!" : "Não foi possível realizar essa operação."
        } catch (error) {
            throw new Error("ContractService.finishContract: " + error);
        }
    } // finishContract()


    static async getContractListByUser(id_user) {
        try {
            let planItems = await Database('plan_contract').where('fk_user', '=', id_user)
            return planItems
        } catch (error) {
            throw new Error("ContractService.getContractListByUser: " + error);
        }
    } // getContractListByUser()

    static async getContractCurrentByUser(id_user) {
        try {
            return await Database("plan_contract")
                .where({ fk_user: id_user })
                .andWhere((builder) =>
                    builder.whereNull('expires_in').orWhere('expires_in', '>', new Date())
                ).whereNull('finish_date').first()
        } catch (error) {
            throw new Error("ContractService.getContractCurrentByUser: " + error);
        }
    } // getContractCurrentByUser()
} // class