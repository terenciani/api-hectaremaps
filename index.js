"use strict";

if (process.env.NODE_ENV == 'homolog') require('./config.homolog.js');
else require('./config');



require('./src/main/services/LoggerService');

const express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
//const ConnectionFactory = require('./connection/ConnectionFactory');
const Loader = require('./Loader');
const Server = require('./Server');



class App {

    static async init() {

        let app = new Server();

        /*var linksPermitidos = ['http://front-associacao.herokuapp.com','https://front-associacao.herokuapp.com', 'http://localhost:3000','https://localhost:3000', 'https://localhost:3001', 'http://localhost:3001']
        var corsOptions = {
        origin: function (origin, callback) {
            if (linksPermitidos.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
                }
            }
        }


          
        app.use(cors(corsOptions));
          
        try {
            global.logger.info("Obtendo conexão com o banco de dados...");
            await ConnectionFactory.getConnection();
            global.logger.success("Banco conectado com sucesso!");
        } catch (error) {
            global.logger.error(`Erro ao conectar com o banco de dados: ${error.message}`);
            process.exit(1);
        } */

        app.use('/uploads', express.static('uploads'));

        // parse requests of content-type - application/json
        app.use(BodyParser.json({
            limit: '50mb'
        }));

        // parse requests of content-type - application/x-www-form-urlencoded
        app.use(BodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        Loader.loadAll(app);

        

        // simple route
        app.get('/', (req, res) => {
            res.json({
                project: "API HectareMaps",
                version: "beta",
                author: "Marcelo Figueiredo Terenciani"
            });
        })
        
        // set port, listen for requests
        const PORT = process.env.PORT || global.config.port;
        app.listen(PORT, () => {
            global.logger.success(`API HectareMaps ${PORT}`);
        });
    }
}

App.init();