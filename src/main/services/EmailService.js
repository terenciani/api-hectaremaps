"use strict";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    name: global.config.mail.auth.user,
    host: global.config.mail.host,
    port: global.config.mail.port,
    secure: global.config.mail.secure,
    auth: {
        user: global.config.mail.auth.user,
        pass: global.config.mail.auth.pass
    },
    tls: { rejectUnauthorized: false }
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
            from: global.config.mail.auth.user,
            to: global.config.mail.to,
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
            from: global.config.mail.auth.user,
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
        let message = "<p>Olá <strong>" + data.name + "</strong>. Agradeçemos sua visita e a oportunidade de recebermos o seu contato. Em até 48 horas você receberá no e-mail fornecido a resposta para sua questão. </p>"
        
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
