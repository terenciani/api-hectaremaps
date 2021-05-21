'use strict';

require('dotenv').config();

require('./src/main/services/LoggerService');

const express = require('express');
const cors = require('cors');
const path = require('path');
const Loader = require('./Loader');
const Server = require('./Server');

class App {
  static async init() {
    let app = new Server();
    app.use(cors());

    app.use('/uploads', express.static('uploads'));

    global.appRoot = path.resolve(__dirname);

    // parse requests of content-type - application/json
    app.use(
      express.json({
        limit: '50mb',
      })
    );

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(
      express.urlencoded({
        limit: '50mb',
        extended: true,
      })
    );

    Loader.loadAll(app);

    // simple route
    app.get('/', (req, res) => {
      res.json({
        project: 'API HectareMaps',
        version: 'beta',
        author: 'Marcelo Figueiredo Terenciani',
      });
    });

    // set port, listen for requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      global.logger.success(`API HectareMaps ${PORT}`);
    });
  }
}

App.init();
