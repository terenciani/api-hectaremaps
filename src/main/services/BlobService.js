"use strict";

const azure = require("azure-storage");
const { BlobServiceClient } = require("@azure/storage-blob");
const { promisify } = require("util");
const Busboy = require("busboy");
const RequestService = require("./RequestService");
const fs = require("fs");
const path = require("path");
const Database = require("../database/Connection");
module.exports = class BlobService {
  static async postV2(req, res) {
    const requestId = req.params.id_request;
    const containerName = `req-${requestId}`;
    const blobSvc = BlobServiceClient.fromConnectionString(
      process.env.AZURE_CREDENTIAL
    );
    const containerClient = blobSvc.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const busboy = BlobService.getBusboyClient(req);
    let originFilename = "";

    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
      originFilename = filename;
      try {
        const data = await RequestService.existImage(requestId, filename);
        if (data.length > 0)
          throw new Error("O arquivo " + filename + " já existe!");
        const blobClient = containerClient.getBlockBlobClient(filename);
        const stream = await blobClient.uploadStream(file);
        console.log(stream);
        RequestService.postImageRequest(filename, requestId);
      } catch (err) {
        console.log(err);
      }
    });

    busboy.on("finish", function () {
      res.status(200).send({
        status: 200,
        message: "Arquivo enviado com sucessod !",
        filename: originFilename,
      });
    });

    req.pipe(busboy);

    req.on("error", function (error) {
      //KO - handle piping errors
      console.log("error: " + error);
    });
    req.once("end", function () {
      //OK
      console.log("all ok");
    });
  }

  static getBusboyClient({ headers }) {
    const busboy = new Busboy({ headers });
    return busboy;
  }

  static async postBlobRequest(req, res, next) {
    //create write stream for blob
    try {
      const blobSvc = azure.createBlobService(process.env.AZURE_CREDENTIAL);
      let requestId = req.params.id_request;

      blobSvc.createContainerIfNotExists(
        "req-" + requestId,
        { publicAccessLevel: "blob" },
        function (error, result, response) {
          if (!error) {
            // Container exists and allows
            // anonymous read access to blob
            // content and metadata within this container

            var busboy = new Busboy({ headers: req.headers });
            let originFilename = "";

            busboy.on(
              "file",
              function (fieldname, file, filename, encoding, mimetype) {
                RequestService.existImage(requestId, filename).then((data) => {
                  if (data.length > 0) {
                    throw new Error("O arquivo " + filename + " já existe!");
                  } else {
                    var stream = blobSvc.createWriteStreamToBlockBlob(
                      "req-" + requestId,
                      filename
                    );
                    originFilename = filename;
                    RequestService.postImageRequest(filename, requestId);
                    //pipe req to Azure BLOB write stream
                    file.pipe(stream);
                  }
                });
              }
            );
            busboy.on("finish", function (filename) {
              res.status(200).send({
                status: 200,
                message: "Arquivo enviado com sucessod !",
                filename: originFilename,
              });
            });

            req.pipe(busboy);

            req.on("error", function (error) {
              //KO - handle piping errors
              console.log("error: " + error);
            });
            req.once("end", function () {
              //OK
              console.log("all ok");
            });
          }
        }
      );
    } catch (error) {
      throw new Error("ImageService.postReport: " + error);
    }
  }
  static async postLocalRequest(req, res, next) {
    //create write stream for blob
    try {
      let requestId = req.params.id_request;
      var busboy = new Busboy({ headers: req.headers });
      let originFilename = "";

      const localpath = `./uploads/request/${requestId}`;
      fs.mkdirSync(localpath, { recursive: true });

      busboy.on(
        "file",
        function (fieldname, file, filename, encoding, mimetype) {
          RequestService.existImage(requestId, filename).then((data) => {
            if (data.length > 0) {
              throw new Error("O arquivo " + filename + " já existe!");
            } else {
              originFilename = filename;
              RequestService.postImageRequest(filename, requestId);
              //pipe req to Azure BLOB write stream
              file.pipe(fs.createWriteStream(`${localpath}/${filename}`));
            }
          });
        }
      );
      busboy.on("finish", function (filename) {
        res.status(200).send({
          status: 200,
          message: "Arquivo enviado com sucessod !",
          filename: originFilename,
        });
      });

      req.pipe(busboy);

      req.on("error", function (error) {
        //KO - handle piping errors
        console.log("error: " + error);
      });
      req.once("end", function () {
        //OK
        console.log("all ok");
      });
    } catch (error) {
      throw new Error("ImageService.postReport: " + error);
    }
  }

  static async postBlobReport(req, res, next) {
    //create write stream for blob
    const blobSvc = azure.createBlobService(process.env.AZURE_CREDENTIAL);
    try {
      let requestId = req.params.id_request;

      blobSvc.createContainerIfNotExists(
        "req-" + requestId,
        { publicAccessLevel: "blob" },
        function (error, result, response) {
          if (!error) {
            // Container exists and allows
            // anonymous read access to blob
            // content and metadata within this container

            var busboy = new Busboy({ headers: req.headers });

            busboy.on(
              "file",
              function (fieldname, file, filename, encoding, mimetype) {
                var stream = blobSvc.createWriteStreamToBlockBlob(
                  "req-" + requestId,
                  "report.pdf"
                );
                RequestService.updateStatus(requestId, "ATTACHED");
                //pipe req to Azure BLOB write stream
                file.pipe(stream);
              }
            );
            busboy.on("finish", function () {
              res
                .status(200)
                .send({ status: 200, message: "Arquivo enviado com sucesso!" });
            });

            req.pipe(busboy);

            req.on("error", function (error) {
              res
                .status(200)
                .send({ status: 500, message: "Erro ao enviar o arquivo!" });
            });
            req.once("end", function () {
              //OK
              console.log("all ok");
            });
          }
        }
      );
    } catch (error) {
      throw new Error("ImageService.postReport: " + error);
    }
  }
  static async getAzureBlob(req, res) {
    const blobSvc = azure.createBlobService(process.env.AZURE_CREDENTIAL);
    var fileName = req.params.fileName;
    var containerName = "req-" + req.params.id_request;
    blobSvc.getBlobProperties(
      containerName,
      fileName,
      function (err, properties, status) {
        if (err) {
          res.send(502, "Error fetching file: %s", err.message);
        } else if (!status.isSuccessful) {
          res.send(404, "The file %s does not exist", fileName);
        } else {
          blobSvc.createReadStream(containerName, fileName).pipe(res);
        }
      }
    );
  }

  static async zipContainer(req, res) {
    const blobSvc = azure.createBlobService(process.env.AZURE_CREDENTIAL);
    var containerName = "req-" + req.params.id_request;
    blobSvc.getBlobProperties(
      containerName,
      fileName,
      function (err, properties, status) {
        if (err) {
          res.send(502, "Error fetching file: %s", err.message);
        } else if (!status.isSuccessful) {
          res.send(404, "The file %s does not exist", fileName);
        } else {
          blobSvc.createReadStream(containerName, fileName).pipe(res);
        }
      }
    );
  }
  static async cancelRequest({ request }) {
    try {
      const blobSvc = azure.createBlobService(process.env.AZURE_CREDENTIAL);
      await blobSvc.deleteContainerIfExists(
        "req-" + request,
        function (error, result, response) {
          if (!error) {
            console.log("container deleted!");
          }
        }
      );
      return `${await Database("request")
        .where({ id_request: request })
        .del()}`;
    } catch (error) {
      throw new Error("RequestService.cancelRequest: " + error);
    }
  } // cancelRequest()
}; // class
