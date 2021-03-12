"use strict";

const nodemailer = require('nodemailer');

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
    static async contactNotify(data) {
        try {
            await this.notifyAdmin(data, "CONTACT")
            await this.notifyClient(data, "CONTACT")
            return "E-mail enviado com sucesso!"
        } catch (error) {
            throw new Error("EmailService.send: " + error);
        }
    } // contactNotify()

    static registerNotify(data) {
        try {
            this.notifyAdmin(data, "REGISTER")
            this.notifyClient(data, "REGISTER")
            return
        } catch (error) {
            throw new Error("EmailService.registerNotify: " + error);
        }
    } // registerNotify()

    static async notifyAdmin(data, type){
        let subject = "";
        let message = "";
        switch(type){
            case 'REGISTER':
                subject = '[SITE] Novo Cadastro - ' + data.name;
                message = this.adminRegisterMessage(data);
            break;
            case 'CONTACT':
                subject = "[SITE] E-mail de contato - " + data.name;
                message = this.adminContactMessage(data);
            break;
        }
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO,
            subject: subject,
            html: message
        };
        try {
            return transporter.sendMail(mailOptions)
        } catch (error) {
            throw new Error("EmailService.notifyAdministrator: " + error);
        }
    } //notifyAdmin

    static async notifyClient(data, type){
        let subject = "";
        let message = "";
        switch(type){
            case 'REGISTER':
                subject = '[HECTAREMAPS] Confirmação de registro';
                message = this.clientRegisterMessage(data);
            break;
            case 'CONTACT':
                subject = "[HECTAREMAPS] Confirmação de Recebimento"
                message = this.clientContactMessage(data);
            break;
        }
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: data.email,
            subject: subject,
            html: message
        };
        try {
            return transporter.sendMail(mailOptions)
        } catch (error) {
            throw new Error("EmailService.notifyClient: " + error);
        }
    } //notifyClient

    static clientContactMessage(data){
        let message = "<p>Olá <strong>" + data.name + "</strong>. <br /> <br /> Agradeçemos sua visita e a oportunidade de recebermos o seu contato. Em até 48 horas você receberá no e-mail fornecido a resposta para sua questão. </p>"
        
        message += "<p>HectareMaps.</p>";

        message += "<p>Observação - Não é necessário responder esta mensagem.</p>";;

        return message
    } //clientContactMessage

    static clientRegisterMessage(data){
        let message = "<p>Olá <strong>" + data.name + "</strong>. <br /> <br /> Agradeçemos o seu registro. Em breve você receberá no e-mail fornecido a resposta para sua solicitação de cadastro. </p>"
        
        message += "<p>HectareMaps.</p>";

        message += "<p>Observação - Não é necessário responder esta mensagem.</p>";

        return message
    } //clientRegisterMessage

    static adminContactMessage(data){
        let message = "<h2>De:</h2> ";
        message  += data.name + " - " + data.email;
        message  += "<h2>Mensagem</h2>";
        message  += "<p>" + data.message + "</p>";

        return message
    } //adminContactMessage

    static adminRegisterMessage(data){
        let message = "<p>Um novo cadastro foi realizado no site. </p> <br />"
        
        message += `<p>Nome: ${data.nme}</p>`;
        message += `<p>Sobrenome: ${data.lastname}</p>`;
        message += `<p>E-mail: ${data.email}</p>`;
        message += `<p>Telefone: ${data.phone}</p>`;

        return message
    } //adminContactMessage
} // class
