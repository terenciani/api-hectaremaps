"use strict";

const fs = require('fs')
const path = require('path');
const multer = require('multer');
const SiteService = require("./SiteService");
 
const siteStorage = multer.diskStorage({
  destination: './assets',
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
        
const upload = multer({
  storage: siteStorage
}).single('file')
        

module.exports = class ImageService {

    static async existsImage(relativePath) {
        try {
            if (fs.existsSync(relativePath))
                return true
            return false
        } catch (error) {
            throw new Error("ImageService.getImage: " + error);
        }
    } // getImage()
    static async postImageSite(req, res) {
        if (!req.params.area)
            res.status(500).send({ status: 500, message: 'Erro interno! A seção deve ser informada.' });

        try {
            var area = req.params.area
        
            upload(req, res, async function (err) {
                if (err) {
                    res.status(200).send({ status: 500, message: 'Erro ao enviar a imagem!' });
                } else {
                    let siteData = await SiteService.getData();
                    let fileName = siteData[area].background
                    let relativePath = `./assets/${fileName}`
                    console.log(relativePath)
                    if (fs.existsSync(relativePath)) {
                        fs.unlink(relativePath, (error) => {
                            console.log(error)
                            return
                        })
                    }
                    siteData[area].background = req.file.filename
                    await SiteService.setData(siteData);
                    res.status(200).send({ status: 200, message: 'Imagem atualizada com sucesso!' })
                }
            })
        } catch (error) {
            throw new Error("ImageService.postImageSite: " + error);
        }
     } // postImageSite
} // class