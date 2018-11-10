const mysql = require('mysql');
const util = require('util');
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = require('./../../config');

const pool  = mysql.createPool({
  connectionLimit : 50,
  host            : DB_HOST,
  user            : DB_USER,
  password        : DB_PASSWORD,
  database        : DB_NAME,
  port: 3306,
  insecureAuth: true
});

pool.query = util.promisify(pool.query);

module.exports = pool;