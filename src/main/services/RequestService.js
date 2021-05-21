'use strict';

const fs = require('fs');
const Database = require('../database/Connection');
const rimraf = require('rimraf');

module.exports = class RequestService {
  static async getAllRequests() {
    try {
      return await Database('request');
    } catch (error) {
      throw new Error('RequestService.getAllRequests: ' + error);
    }
  } // getAllRequests()

  static async existImage(requestId, filename) {
    try {
      return await Database('request_image')
        .where({ fk_request: requestId })
        .andWhere({ filename: filename });
    } catch (error) {
      throw new Error('RequestService.getAllRequests: ' + error);
    }
  } // getAllRequests()

  static async getRequestData(id_request) {
    try {
      let request = await Database('request')
        .where({ id_request: id_request })
        .first();
      request.images = await Database('request_image')
        .select('filename')
        .where({
          fk_request: id_request,
        });
      request.user = await Database('user')
        .select('name', 'lastname', 'email', 'phone')
        .where({
          id_user: request.fk_user,
        })
        .first();

      request.services = await Database('request_service')
        .select('description')
        .innerJoin(
          'item_plan',
          'request_service.fk_item_plan',
          'item_plan.id_item_plan'
        )
        .where({
          fk_request: id_request,
        });

      return request;
    } catch (error) {
      throw new Error('PlanService.getFullList: ' + error);
    }
  } // getRequestData()

  static async createRequest({ selectedServices, plan, description }) {
    try {
      let id = await Database('request').insert({
        fk_plan: plan.fk_plan,
        fk_user: plan.fk_user,
        description: description,
        create_at: new Date(),
      });
      for (let i = 0; i < selectedServices.length; i++) {
        await Database('request_service').insert({
          fk_request: id[0],
          fk_item_plan: selectedServices[i],
        });
      }
      return id[0];
    } catch (error) {
      throw new Error('RequestService.createRequest: ' + error);
    }
  } // createRequest()
  static async getRequestActivesByUser(id_user) {
    try {
      return await Database('request')
        .where({ fk_user: id_user })
        .andWhere('status', '!=', 'FINISHED');
    } catch (error) {
      throw new Error('RequestService.getRequestActivesByUser: ' + error);
    }
  } // getRequestActivesByUser()

  static async getAllUserRequests(id_user) {
    try {
      return await Database('request').where({ fk_user: id_user });
    } catch (error) {
      throw new Error('RequestService.getAllUserRequests: ' + error);
    }
  } // getAllUserRequests()

  static async getImagesByRequest(id_request) {
    try {
      return await Database('request_image').where({ fk_request: id_request });
    } catch (error) {
      throw new Error('RequestService.getImagesByRequest: ' + error);
    }
  } // getImagesByRequest()
  static async postImageRequest(imageName, id_request) {
    try {
      return await Database('request_image').insert({
        filename: imageName,
        fk_request: id_request,
        upload_date: new Date(),
      });
    } catch (error) {
      throw new Error('RequestService.postImageRequest: ' + error);
    }
  } // postImageRequest()

  static async cancelRequest({ request }) {
    try {
      rimraf.sync(`${appRoot}/uploads/request/${request}`);
      return `${await Database('request')
        .where({ id_request: request })
        .del()}`;
    } catch (error) {
      throw new Error('RequestService.cancelRequest: ' + error);
    }
  } // cancelRequest()

  static async updateStatus(requestId, status) {
    try {
      let row = await Database('request')
        .where({ id_request: requestId })
        .update({
          status: status,
          update_at: new Date(),
        });
      return row >= 1
        ? 'Atualização realizada com sucesso!'
        : 'Não foi possível atualizar esse registro.';
    } catch (error) {
      throw new Error('RequestService.update: ' + error);
    }
  } // update()

  static async getFileZip(req, res) {
    try {
      let requestId = req.params.id_request;
      let imagesDB = await Database('request_image').select('filename').where({
        fk_request: requestId,
      });

      let imagesDIR = [];

      for (let i = 0; i < imagesDB.length; i++) {
        let relativePath = `${appRoot}/uploads/request/${requestId}/${imagesDB[i].filename}`;
        if (fs.existsSync(relativePath)) {
          imagesDIR.push({
            path: relativePath,
            name: imagesDB[i].filename,
          });
        }
      }

      res.zip(imagesDIR);
    } catch (error) {
      throw new Error('RequestService.getFileZip: ' + error);
    }
  }
}; // class
