"use strict";

const nodemailer = require('nodemailer');
const TokenUtil = require("../utils/TokenUtil");

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

    static recoveryNotify(data) {
        try {
            this.notifyClient(data, "RECOVERY")
            return
        } catch (error) {
            throw new Error("EmailService.registerNotify: " + error);
        }
    } // recoveryNotify()

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
                subject = `[${process.env.COMPANY.toUpperCase()}] Confirmação de registro`;
                message = this.clientRegisterMessage(data);
            break;
            case 'CONTACT':
                subject = `[${process.env.COMPANY.toUpperCase()}] Confirmação de Recebimento`
                message = this.clientContactMessage(data);
            break;
            case 'RECOVERY':
                subject = `[${process.env.COMPANY.toUpperCase()}] Recuperação de senha`
                message = this.clientRecoveryMessage(data);
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
        return `<p>Olá <strong> ${data.name}</strong>. </p> <br />
        <p>Agradeçemos sua visita e a oportunidade de recebermos o seu contato. Em até 48 horas você receberá no e-mail fornecido a resposta para sua questão. </p> <br />
        <p>Atenciosamente,</p>
        <p>${process.env.COMPANY}</p><br />
        <p>Observação - Não é necessário responder esta mensagem.</p>`
    } //clientContactMessage

    static clientRecoveryMessage(data){
        return `h2>Solicitação de recuperação de senha</h2>
        <p>Senha: ${data.temp_password}</p>
        <p>Se vcê não fez essa solicitação, basta ignorar este e-mail.</p>
        <p>Observação - Não é necessário responder esta mensagem.</p>
        <p>${process.env.COMPANY}</p>`;
    } //clientRecoveryMessage

    static clientRegisterMessage(data) {
        let token = TokenUtil.genereteToken({ name: data.name, email: data.email, id_user: data.id_user, role: data.role });

        return `<p>Olá <strong> ${data.name}</strong>.</p>
        <p>Você acabou de realizar seu registro na ${process.env.COMPANY} usando esta conta de e-mail.</p>
        <a href='${process.env.API}/emailconfirm/${token}' target='_blank'>Clique aqui para confirmar seu e-mail</a> <br />
        <p>Atenciosamente,</p>
        <p>${process.env.COMPANY}</p>
        <p>Observação - Não é necessário responder esta mensagem.</p>`
    } //clientRegisterMessage

    static adminContactMessage(data){
        return `<h3>De:</h3> 
        <p>${data.name} - ${data.email}</p>
        <h3>Mensagem</h3>
        <p>${data.message}</p>`;
    } //adminContactMessage

    static adminRegisterMessage(data){
        return `<p>Um novo cadastro foi realizado no site. </p>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Sobrenome:</strong> ${data.lastname}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.phone}</p>`;
    } //adminContactMessage
} // class
