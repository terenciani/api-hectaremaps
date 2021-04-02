"use strict";

const Database = require("../database/Connection")

module.exports = class RequestService {
    static async createRequest({ selectedServices, plan }) {
        try {
            
            let id = await Database("request").insert({
                fk_plan: plan.fk_plan,
                fk_user: plan.fk_user,
                request_date: new Date()
            })
            for (let i = 0; i < selectedServices.length; i++) {
                await Database("request_service").insert({
                    fk_request: id[0],
                    fk_item_plan: selectedServices[i]
                })
            }
            return id[0]
        } catch (error) {
            throw new Error("RequestService.createRequest: " + error);
        }
    } // createRequest()
    static async getRequestActivesByUser(id_user) {
        try {
            return await Database("request").where({ fk_user: id_user }).andWhere('status', '!=', 'FINISHED');
        } catch (error) {
            throw new Error("RequestService.getRequestActivesByUser: " + error);
        }
    } // getRequestActivesByUser()

    static async getImagesByRequest(id_request) {
        try {
            return await Database("request_image").where({ fk_request: id_request });
        } catch (error) {
            throw new Error("RequestService.getImagesByRequest: " + error);
        }
    } // getImagesByRequest()
    static async postImageRequest(imageName, id_request) {
        try {
            
            return await Database("request_image").insert({
                filename: imageName,
                fk_request: id_request,
                upload_date: new Date()
            })
        } catch (error) {
            throw new Error("RequestService.postImageRequest: " + error);
        }
    } // postImageRequest()
} // class