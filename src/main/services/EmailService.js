'use strict';

const nodemailer = require('nodemailer');
const TokenUtil = require('../utils/TokenUtil');
const { api, company } = require('./../../../configuration.json');

module.exports = class EmailService {
  static async send(subject, message, to = undefined) {
    let mailOptions = {
      from: process.env.MAIL_USER,
      to: to ? to : process.env.MAIL_TO,
      subject: subject,
      html: message,
    };
    let transporter = nodemailer.createTransport({
      name: process.env.MAIL_USER,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { rejectUnauthorized: process.env.MAIL_TLS },
    });
    return await transporter.sendMail(mailOptions);
  } // enviar

  static async contactNotify(data) {
    try {
      await this.notifyAdmin(data, 'CONTACT');
      await this.notifyClient(data, 'CONTACT');
      return 'E-mail enviado com sucesso!';
    } catch (error) {
      throw new Error('EmailService.send: ' + error);
    }
  } // contactNotify()

  static registerNotify(data) {
    try {
      this.notifyAdmin(data, 'REGISTER');
      this.notifyClient(data, 'REGISTER');
      return;
    } catch (error) {
      throw new Error('EmailService.registerNotify: ' + error);
    }
  } // registerNotify()

  static recoveryNotify(data) {
    try {
      this.notifyClient(data, 'RECOVERY');
      return;
    } catch (error) {
      throw new Error('EmailService.registerNotify: ' + error);
    }
  } // recoveryNotify()

  static emailUpdateNotify(data) {
    try {
      this.notifyClient(data, 'EMAILUPDATE');
      return;
    } catch (error) {
      throw new Error('EmailService.emailUpdateNotify: ' + error);
    }
  } // emailUpdateNotify()

  static async notifyAdmin(data, type) {
    let subject = '';
    let message = '';
    switch (type) {
      case 'REGISTER':
        subject = '[SITE] Novo Cadastro - ' + data.name;
        message = this.adminRegisterMessage(data);
        break;
      case 'CONTACT':
        subject = '[SITE] E-mail de contato - ' + data.name;
        message = this.adminContactMessage(data);
        break;
    }
    try {
      return this.send(subject, message);
    } catch (error) {
      throw new Error('EmailService.notifyAdministrator: ' + error);
    }
  } //notifyAdmin

  static async notifyClient(data, type) {
    let subject = '';
    let message = '';
    switch (type) {
      case 'REGISTER':
        subject = `[${company.toUpperCase()}] Confirma????o de registro`;
        message = this.clientRegisterMessage(data);
        break;
      case 'CONTACT':
        subject = `[${company.toUpperCase()}] Confirma????o de Recebimento`;
        message = this.clientContactMessage(data);
        break;
      case 'RECOVERY':
        subject = `[${company.toUpperCase()}] Recupera????o de senha`;
        message = this.clientRecoveryMessage(data);
        break;
      case 'EMAILUPDATE':
        subject = `[${company.toUpperCase()}] Atualiza????o do e-mail`;
        message = this.clientUpdateEmailMessage(data);
        break;
    }
    try {
      return this.send(subject, message, data.email);
    } catch (error) {
      throw new Error('EmailService.notifyClient: ' + error);
    }
  } //notifyClient

  static clientContactMessage(data) {
    return `<p>Ol?? <strong> ${data.name}</strong>. </p>
        <p>Agrade??emos sua visita e a oportunidade de recebermos o seu contato. </p>
        <p>Em at?? 48 horas voc?? receber?? no e-mail fornecido a resposta para sua quest??o. </p>
        <p>Atenciosamente,</p>
        <p>${company}</p>
        <p>Observa????o - N??o ?? necess??rio responder esta mensagem.</p>`;
  } //clientContactMessage

  static clientRecoveryMessage(data) {
    return `<h2>Solicita????o de recupera????o de senha</h2>
        <p>Senha: ${data.temp_password}</p>
        <p>Se voc?? n??o fez essa solicita????o, basta ignorar este e-mail.</p>
        <p>Observa????o - N??o ?? necess??rio responder esta mensagem.</p>
        <p>${company}</p>`;
  } //clientRecoveryMessage

  static clientRegisterMessage(data) {
    let token = TokenUtil.genereteToken({
      name: data.name,
      email: data.email,
      id_user: data.id_user,
      role: data.role,
    });

    return `<p>Ol?? <strong> ${data.name}</strong>.</p>
        <p>Voc?? acabou de realizar seu registro na ${company} usando esta conta de e-mail.</p>
        <a href='${api}/emailconfirm/${token}' target='_blank'>Clique aqui para confirmar seu e-mail</a> <br />
        <p>Atenciosamente,</p>
        <p>${company}</p>
        <p>Observa????o - N??o ?? necess??rio responder esta mensagem.</p>`;
  } //clientRegisterMessage

  static clientUpdateEmailMessage(data) {
    let token = TokenUtil.genereteToken({
      name: data.name,
      email: data.email,
      newEmail: data.newEmail,
      id_user: data.id_user,
      role: data.role,
    });

    return `<p>Ol?? <strong> ${data.name}</strong>.</p>
        <p>Voc?? acabou de alterar seu e-mail na ${company} para <strong>${data.newEmail}.</p>
        <a href='${api}/emailupdateconfirm/${token}' target='_blank'>Clique aqui para confirmar a altera????o para o novo e-mail</a> <br />
        <p>Atenciosamente,</p>
        <p>${company}</p>
        <p>Observa????o - N??o ?? necess??rio responder esta mensagem.</p>`;
  } //clientRegisterMessage

  static adminContactMessage(data) {
    return `<h3>De:</h3> 
        <p>${data.name} - ${data.email}</p>
        <h3>Mensagem</h3>
        <p>${data.message}</p>`;
  } //adminContactMessage

  static adminRegisterMessage(data) {
    return `<p>Um novo cadastro foi realizado no site. </p>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Sobrenome:</strong> ${data.lastname}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.phone}</p>`;
  } //adminContactMessage
}; // class
