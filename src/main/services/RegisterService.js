"use strict";

const EmailService = require("./EmailService");
const TokenUtil = require("../utils/TokenUtil");

const Database = require("../database/Connection");

module.exports = class RegisterService {
    static async signUp(data) {
        try {
            let result = await Database("user").where({email: data.email}).first()
            
            if(!result || !result.id_user){
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
    static async signIn(data) {
        try {
            let emailValid = await await Database("user").where({email: data.email}).first()
            if(!emailValid || !emailValid.id_user)
                return {status: 422, message: "E-mail não encontrado!"}
            

            let user = await Database("user").where({email: data.email, password: data.password}).first()
            if(!user || !user.id_user)
                return {status: 422, message: "Senha incorreta!"}
            
            if(user.status == "NEW")
                return {status: 422, message: "Seu acesso ainda não foi autorizado. Aguarde nosso contato."}

            if(user.status == "BLOCKED")
                return {status: 422, message: "Por motivo de segurança seu usuário está bloqueado. Entre em contato conosco!"}

            let token = TokenUtil.genereteToken({name: user.name, email: user.email, id_user: user.id_user, role: user.role});

            let userFormatted = await this.loggedUserFormatter(user, token);
            
            return {status: 200, message: "Acesso Autorizado.", user: userFormatted}
            
        } catch (error) {
            throw new Error("RegisterService.signIn: " + error);
        }
    } // signIn()

    static async create({name, lastname, email, phone}) {
        try {
            return await Database("user").insert({
                name, 
                lastname, 
                email, 
                phone
            })
        } catch (error) {
            throw new Error("RegisterService.create: " + error);
        }
    } // create()

    // Devolver usuario logado com token
    static async loggedUserFormatter(user, token) {
        return {
            id_user: user.id_user,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
            token: token
        };
    }// loggedUserFormatter
} // class
