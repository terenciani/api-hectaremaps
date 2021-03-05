const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'hectar77_root',
      password : 'TeT.28465',
      database : 'hectar77_banco'
    }
});

module.exports = knex;