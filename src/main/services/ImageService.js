"use strict";

const fs = require('fs')
const path = require('path');
const multer = require('multer');
const ConfigService = require("./ConfigService");
const RequestService = require('./RequestService');
 
const siteStorage = multer.diskStorage({
  destination: './assets',
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const requestStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.params.id_request
        const path = `./uploads/request/${id}`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
        
const upload = multer({
  storage: siteStorage
}).single('file')
        
const uploadRequest = multer({
    storage: requestStorage,
    fileFilter: function (req, file, cb) {
        let requestId = req.params.id_request;
        let relativePath = `${appRoot}/uploads/request/${requestId}/${file.originalname}`;
        if (fs.existsSync(relativePath)) {
            return cb(new Error('Arquivo já existente!'))
        }
        cb(null, true)
    }
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

            if (area == 'logo') {
                upload(req, res, async function (err) {
                    if (err) {
                        res.status(200).send({ status: 500, message: 'Erro ao enviar a imagem!' });
                    } else {
                        let siteData = await ConfigService.getData();
                        let fileName = siteData.icon.logo
                        let relativePath = `./assets/${fileName}`
                        if (fs.existsSync(relativePath)) {
                            fs.unlink(relativePath, (error) => {
                                console.log(error)
                                return
                            })
                        }
                        siteData.icon.logo = req.file.filename
                        await ConfigService.setData(siteData);
                        res.status(200).send({ status: 200, message: 'Imagem atualizada com sucesso!' })
                    }
                })
            } else if (area == 'favicon') {
                upload(req, res, async function (err) {
                    if (err) {
                        res.status(200).send({ status: 500, message: 'Erro ao enviar a imagem!' });
                    } else {
                        let siteData = await ConfigService.getData();
                        let fileName = siteData.icon.favicon
                        let relativePath = `./assets/${fileName}`
                        if (fs.existsSync(relativePath)) {
                            fs.unlink(relativePath, (error) => {
                                console.log(error)
                                return
                            })
                        }
                        siteData.icon.favicon = req.file.filename
                        await ConfigService.setData(siteData);
                        res.status(200).send({ status: 200, message: 'Imagem atualizada com sucesso!' })
                    }
                })
            }else {
                upload(req, res, async function (err) {
                    if (err) {
                        res.status(200).send({ status: 500, message: 'Erro ao enviar a imagem!' });
                    } else {
                        let siteData = await ConfigService.getData();
                        let fileName = siteData[area].background
                        let relativePath = `./assets/${fileName}`
                        if (fs.existsSync(relativePath)) {
                            fs.unlink(relativePath, (error) => {
                                console.log(error)
                                return
                            })
                        }
                        siteData[area].background = req.file.filename
                        await ConfigService.setData(siteData);
                        res.status(200).send({ status: 200, message: 'Imagem atualizada com sucesso!' })
                    }
                })
            }
        } catch (error) {
            throw new Error("ImageService.postImageSite: " + error);
        }
    } // postImageSite
    static async postVideoSite(req, res) {
        try {
            upload(req, res, async function (err) {
                if (err) {
                    res.status(200).send({ status: 500, message: 'Erro ao enviar o vídeo!' });
                } else {
                    let siteData = await ConfigService.getData();
                    let fileName = siteData.video.src
                    let relativePath = `./assets/${fileName}`
                    if (fs.existsSync(relativePath)) {
                        fs.unlink(relativePath, (error) => {
                            console.log(error)
                            return
                        })
                    }
                    siteData.video.src = req.file.filename
                    await ConfigService.setData(siteData);
                    res.status(200).send({ status: 200, message: 'Vídeo atualizado com sucesso!' })
                }
            })
        } catch (error) {
            throw new Error("ImageService.postVideoSite: " + error);
        }
    } // postVideoSite
    static async postImageRequest(req, res) {
        try {
            
            let requestId = req.params.id_request;
            
            uploadRequest(req, res, async function (err) {
                if (err) {
                    res.status(200).send({ status: 500, message: 'Erro ao enviar o vídeo!' });
                } else {
                    await RequestService.postImageRequest(req.file.filename, requestId)
                    res.status(200).send({ status: 200, message: 'Arquivo enviado com sucesso!' })
                }
            })
            
        } catch (error) {
            throw new Error("ImageService.postImageRequest: " + error);
        }
    } // postImageRequest
} // class