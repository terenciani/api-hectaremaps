const ConfigService = require("./../services/ConfigService");

const { database } = require("./../../../configuration.json");

const knex = require('knex')(database);
/*
knex.on( 'query', function( queryData ) {
    console.log( queryData.sql );
});
*/
module.exports = knex;