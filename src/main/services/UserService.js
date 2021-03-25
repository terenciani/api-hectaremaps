"use strict";

const Database = require("../database/Connection");

module.exports = class UserService {
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
} // class
