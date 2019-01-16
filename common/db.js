const config = require('../config/common');
const place = require('../anchor');
const util = require('util');
const mysql = require('mysql');


//DB Connection

const pool = mysql.createPool({
    connectionLimit: config[place].dbConnectionLimit,
    host: config[place].dbHost,
    database: config[place].dbDatabase,
    user: config[place].dbUser,
    password: config[place].dbPassword
});

pool.query = util.promisify(pool.query);


module.exports = pool;