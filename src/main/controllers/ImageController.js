'use strict';

const ImageService = require('../services/ImageService');
const ConfigService = require('../services/ConfigService');

module.exports = class ImageController {
  static async getImage(req, res) {
    try {
      let relativePath = appRoot + '/assets/' + req.params.fileName;
      if (await ImageService.existsImage(relativePath)) {
        res.status(200).sendFile(relativePath);
      } else {
        res.status(404).send('Arquivo não encontrado');
      }
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.getImage ' + e.message);
    }
  } // getImage()

  static async getRequestImage(req, res) {
    try {
      let relativePath = `${appRoot}/uploads/request/${req.params.id_request}/${req.params.fileName}`;
      if (await ImageService.existsImage(relativePath)) {
        res.status(200).sendFile(relativePath);
      } else {
        res.status(404).send('Arquivo não encontrado');
      }
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.getRequestImage ' + e.message);
    }
  } // getRequestImage()

  static async getIcon(req, res) {
    try {
      let siteData = await ConfigService.getData();
      let relativePath = appRoot + '/assets/' + siteData.icon[req.params.area];
      if (await ImageService.existsImage(relativePath)) {
        res.status(200).sendFile(relativePath);
      } else {
        res.status(404).send('Arquivo não encontrado');
      }
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.getImage ' + e.message);
    }
  } // getImage()
  static async postImageSite(req, res) {
    try {
      await ImageService.postImageSite(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.postImageSite ' + e.message);
    }
  } // postImageSite()

  static async postVideoSite(req, res) {
    try {
      await ImageService.postVideoSite(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.postVideoSite ' + e.message);
    }
  } // postVideoSite()
  static async postImageRequest(req, res) {
    try {
      await ImageService.postImageRequest(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.postImageRequest ' + e.message);
    }
  } // postImageRequest()

  static async postReport(req, res) {
    try {
      await ImageService.postReport(req, res);
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error('ImageController.postReport ' + e.message);
    }
  } // postReport()
}; // class
