"use strict";

const ImageService = require("../services/ImageService");
module.exports = class ImageController {
  static async getImage(req, res) {
    try {
      let relativePath = appRoot  + '/assets/' + req.params.fileName
      if(await ImageService.existsImage(relativePath)){
        res.status(200).sendFile(relativePath)
      }else{
        res.status(404).send("Arquivo não encontrado");
      }     
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("ImageController.getImage " + e.message);
    }
  } // getImage()
}; // class