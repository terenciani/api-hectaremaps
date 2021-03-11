const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : global.config.db.host,
      user : global.config.db.user,
      password : global.config.db.password,
      database : global.config.db.database
    }
});

module.exports = knex;