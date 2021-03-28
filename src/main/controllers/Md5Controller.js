"use strict";
const md5 = require('md5');

module.exports = class Md5Controller {
  
  static async md5(req, res) {
      if (!req.params.string)
      res.status(200).send('ERRO');
    
    res.status(200).send(md5(req.params.string));
  } // emailConfirm()
}; // class