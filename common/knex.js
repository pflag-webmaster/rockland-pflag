const config = require('../config/common');
const place = require('../anchor')

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config[place].dbHost,
        database: config[place].dbDatabase,
        user: config[place].dbUser,
        password: config[place].dbPassword
    }
});


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Meatl0af!'
module.exports = knex;