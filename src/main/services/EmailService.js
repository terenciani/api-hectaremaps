"use strict";

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    name: process.env.MAIL_USER,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: { rejectUnauthorized: process.env.MAIL_TLS }
});

module.exports = class EmailService {
    static async send(data) {
        try {
            await this.sendForAdministrator(data)
            await this.sendForClient(data)
            return "E-mail enviado com sucesso!"
        } catch (error) {
            throw new Error("ServiceService.send: " + error);
        }
    } // send()

    static async sendForAdministrator(data){
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO,
            subject: '[SITE] E-mail de contato - ' + data.name,
            html: this.configureAdminMessage(data)
        };
        try {
            return transporter.sendMail(mailOptions)
        } catch (error) {
            throw new Error("ServiceService.send: " + error);
        }
    } //sendForAdministrator

    static async sendForClient(data){
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: data.address,
            subject: '[HECTAREMAPS] Confirmação de Recebimento',
            html: this.configureClientMessage(data)
        };
        try {
            return transporter.sendMail(mailOptions)
        } catch (error) {
            throw new Error("ServiceService.send: " + error);
        }
    } //sendForClient

    

    static configureClientMessage(data){
        let message = "<p>Olá <strong>" + data.name + "</strong>. <br /> <br /> Agradeçemos sua visita e a oportunidade de recebermos o seu contato. Em até 48 horas você receberá no e-mail fornecido a resposta para sua questão. </p>"
        
        message += "<p>HectareMaps.</p>";

        message += "<p>Observação - Não é necessário responder esta mensagem.</p>";;

        return message
    } //configureClientMessage

    static configureAdminMessage(data){
        let message = "<h2>De:</h2> ";
        message  += data.name + " - " + data.address;
        message  += "<h2>Mensagem</h2>";
        message  += "<p>" + data.message + "</p>";

        return message
    } //configureAdminMessage
} // class
