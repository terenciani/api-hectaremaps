"use strict";

const Database = require("../database/Connection");

module.exports = class UserService {
    static async findById(id_user) {
        try {
            return await Database("user").where({ id_user: id_user }).first()
        } catch (error) {
            throw new Error("UserService.findById: " + error);
        }
    } // findById()
    static async getAll() {
        try {
            return await Database("user")
        } catch (error) {
            throw new Error("UserService.getAll: " + error);
        }
    } // getAll()
    static async delete(user) {
        try {
            let row = await Database("user").where({ id_user: user.id_user }).del();
            return row >=1 ? "Exclusão realizada com sucesso!" : "Não foi possível excluir esse registro."
        } catch (error) {
            throw new Error("UserService.delete: " + error);
        }
    } // delete()
    static async update(user) {
        try {
            let row = await Database("user").where({ email: user.email }).update({
                name: user.name,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email,
                role: user.role,
                status: user.status,
            });
            return row >=1 ? "Atualização realizada com sucesso!" : "Não foi possível atualizar esse registro."
        } catch (error) {
            throw new Error("UserService.delete: " + error);
        }
    } // delete()

    static async registrationUpdate(user) {
        try {
            console.log(user)
            let row = await Database("user").where({ email: user.email }).update({
                name: user.name,
                phone: user.phone,
                lastname: user.lastname,
                cpf: user.cpf,
                cep: user.cep,
                address: user.address,
                number: user.number,
                complement: user.complement,
                district: user.district,
                city: user.city,
                uf: user.uf,
                status: 'ACTIVE',
            });
            return row >=1 ? "Atualização realizada com sucesso!" : "Não foi possível atualizar esse registro."
        } catch (error) {
            throw new Error("UserService.registrationUpdate: " + error);
        }
    } // registrationUpdate()

    static async create({ name, lastname, email, phone, password }) {
        try {
            let row = await Database("user").insert({
                name,
                lastname,
                email,
                phone,
                password
            })
            return row >=1 ? "Cadastro realizado com sucesso!" : "Não foi possível concluir o registro."
        } catch (error) {
            throw new Error("UserService.create: " + error);
        }
    } // create()
} // class
