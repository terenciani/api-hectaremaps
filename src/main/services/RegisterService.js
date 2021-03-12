"use strict";

const EmailService = require("./EmailService");


const Database = require("../database/Connection")

module.exports = class RegisterService {
    static async signUp(data) {
        try {
            let result = await this.existsEmail(data.email)
            if(!result)
                return
            
            if(result.length == 0){
                await this.create(data)
                EmailService.registerNotify(data)
                return {status: 200, message: "Pedido de registro realizado! Aguarde nosso contato."}
            }else{
                return {status: 422, message: "E-mail já cadastrado!"}
            }
        } catch (error) {
            throw new Error("RegisterService.signUp: " + error);
        }
    } // signUp()
    static async create({name, lastname, email, phone}) {
        try {
            let status = "BLOCKED"
            return await Database("user").insert({
                name, 
                lastname, 
                email, 
                phone,
                status
            })
        } catch (error) {
            throw new Error("RegisterService.create: " + error);
        }
    } // create()
    static async existsEmail(email){
        try {
            return await Database("user").where({email: email})
        } catch (error) {
            throw new Error("RegisterService.existsEmail: " + error);
        }
    } //existsEmail
} // class
