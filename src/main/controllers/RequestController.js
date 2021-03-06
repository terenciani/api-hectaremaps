'use strict';

const RequestService = require('../services/RequestService');
const BlobService = require('../services/BlobService');

module.exports = class RequestController {
  static async getAllRequests(req, res) {
    try {
      res.status(200).send(await RequestService.getAllRequests());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.getAllRequests ' + e.message);
    }
  } // getAllRequests()
  static async getRequestData(req, res) {
    try {
      res
        .status(200)
        .send(await RequestService.getRequestData(req.params.id_request));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.getRequestData ' + e.message);
    }
  } // getRequestData()
  static async createRequest(req, res) {
    try {
      res.status(200).send(`${await RequestService.createRequest(req.body)}`);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.createRequest ' + e.message);
    }
  } // createRequest()
  static async getRequestActivesByUser(req, res) {
    try {
      res
        .status(200)
        .send(await RequestService.getRequestActivesByUser(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error(
        'RequestController.getRequestActivesByUser ' + e.message
      );
    }
  } // getRequestActivesByUser()

  static async getAllUserRequests(req, res) {
    try {
      res
        .status(200)
        .send(await RequestService.getAllUserRequests(req.params.id_user));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.getAllUserRequests ' + e.message);
    }
  } // getAllUserRequests()

  static async getImagesByRequest(req, res) {
    try {
      res
        .status(200)
        .send(await RequestService.getImagesByRequest(req.params.id_request));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.getImagesByRequest ' + e.message);
    }
  } // getImagesByRequest()

  static async cancelRequest(req, res) {
    try {
      res.status(200).send(await BlobService.cancelRequest(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.cancelRequest ' + e.message);
    }
  } // cancelRequest()

  static async cancelLocalRequest(req, res) {
    try {
      res.status(200).send(await RequestService.cancelLocalRequest(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.cancelLocalRequest ' + e.message);
    }
  } // cancelLocalRequest()

  static async cancelRequestOld(req, res) {
    try {
      res.status(200).send(await RequestService.cancelRequest(req.body));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.cancelRequest ' + e.message);
    }
  } // cancelRequest()

  static async update(req, res) {
    try {
      res
        .status(200)
        .send(
          await RequestService.updateStatus(
            req.body.id_request,
            req.body.status
          )
        );
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestController.update ' + e.message);
    }
  } // update()

  static async getFileZip(req, res) {
    try {
      await RequestService.getFileZip(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('RequestService.getFileZip ' + e.message);
    }
  } // getFileZip()
}; // class
