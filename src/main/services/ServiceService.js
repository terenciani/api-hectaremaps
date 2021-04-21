'use strict';

const Database = require('../database/Connection');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ConfigService = require('./ConfigService');

const siteStorage = multer.diskStorage({
  destination: './assets',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: siteStorage,
}).single('file');

module.exports = class ServiceService {
  static async getList() {
    try {
      return await Database('service');
    } catch (error) {
      throw new Error('ServiceService.getList: ' + error);
    }
  } // getList()

  static async getActives() {
    try {
      return await Database('service').where({ active: true });
    } catch (error) {
      throw new Error('ServiceService.getActives: ' + error);
    }
  } // getActives()

  static async delete(service) {
    try {
      let relativePath = `./assets/${service.image}`;
      if (fs.existsSync(relativePath)) {
        fs.unlink(relativePath, (error) => {
          if (error) console.log(error);
          return;
        });
      }
      let row = await Database('service')
        .where({ id_service: service.id_service })
        .del();

      return row >= 1
        ? 'Exclusão realizada com sucesso!'
        : 'Não foi possível excluir esse registro.';
    } catch (error) {
      throw new Error('ServiceService.delete: ' + error);
    }
  } // delete()
  static async create(req, res) {
    try {
      upload(req, res, async function (err) {
        if (err) {
          res
            .status(200)
            .send({ status: 500, message: 'Erro ao cadastrar o serviço!' });
          return;
        } else if (req.body.service) {
          let service = JSON.parse(req.body.service);

          await Database('service').insert({
            name: service.name,
            description: service.description,
            image: req.file.filename,
            price: service.price,
            active: service.active,
          });
          res.status(200).send({
            status: 200,
            message: 'Serviço cadastrado com sucesso!',
          });
          return;
        } else {
          res.status(200).send({
            status: 500,
            message: 'Erro ao cadastrar o serviço!',
          });
          return;
        }
      });
    } catch (error) {
      throw new Error('ServiceService.create: ' + error);
    }
  } // create()

  static async update(req, res) {
    try {
      upload(req, res, async function (err) {
        if (err) {
          res
            .status(200)
            .send({ status: 500, message: 'Erro a atualizar o serviço!' });
          return;
        } else if (req.body.service) {
          let service = JSON.parse(req.body.service);
          if (req.file && req.file.filename) {
            let relativePath = `./assets/${service.image}`;
            if (fs.existsSync(relativePath)) {
              fs.unlink(relativePath, (error) => {
                if (error) console.log(error);
                return;
              });
            }
            await Database('service')
              .where({ id_service: service.id_service })
              .update({
                name: service.name,
                description: service.description,
                image: req.file.filename,
                price: service.price,
                active: service.active,
              });
          } else {
            await Database('service')
              .where({ id_service: service.id_service })
              .update({
                name: service.name,
                description: service.description,
                price: service.price,
                active: service.active,
              });
          }
          res.status(200).send({
            status: 200,
            message: 'Serviço atualizado com sucesso!',
          });
        } else {
          res.status(200).send({
            status: 500,
            message: 'Erro ao atualizar o serviço!',
          });
          return;
        }
      });
    } catch (error) {
      throw new Error('ServiceService.update: ' + error);
    }
  } // create()
}; // class
