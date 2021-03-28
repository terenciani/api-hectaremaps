"use strict";

const Database = require("../database/Connection")

module.exports = class ContractService {

    static async getContractList() {
        try {
            return await Database("plan_contract")
        } catch (error) {
            throw new Error("ContractService.getContractList: " + error);
        }
    } // getContractList()
   
    static async contract({ plan, user}) {
        try {
            let date = new Date();
            let expires = new Date();
            expires.setMonth(date.getMonth() + plan.months_of_validity)
            console.log(expires)
            let row = await Database("plan_contract").insert({
                fk_plan: plan.id_plan,
                fk_user: user.id_user,
                expires_in: expires, 
                contract_date: date
            })
            return row >=1 ? "Sua solicitação foi realizada com sucesso!" : "Não foi possível concluir sua solicitação."
        } catch (error) {
            throw new Error("ContractService.contract: " + error);
        }
    } // create()
    
    static async updateContract(planContract) {
        try {
            return "TODO"
        } catch (error) {
            throw new Error("ContractService.updateContract: " + error);
        }
    } // updateContract()

    static async getContractListByUser(id_user) {
        try {
            let planItems = await Database('plan_contract').where('fk_user', '=', id_user)
            return planItems
        } catch (error) {
            throw new Error("ContractService.getContractListByUser: " + error);
        }
    } // getContractListByUser()

    static async deleteContract(planContract) {
        try {
            let row = await Database("plan_contract").where({ id_plan_contract: planContract.id_plan_contract }).del();
            return row >=1 ? "Exclusão realizada com sucesso!" : "Não foi possível excluir esse registro."
        } catch (error) {
            throw new Error("ContractService.deleteContract: " + error);
        }
    } // deleteContract()

    static async getContractCurrentByUser(id_user) {
        try {
            return await Database("plan_contract").where({ fk_user: id_user }).andWhere('expires_in', '>', new Date()).whereNull('finish_date').first()
        } catch (error) {
            throw new Error("ContractService.getContractCurrentByUser: " + error);
        }
    } // getContractCurrentByUser()
} // class