var pg = require('pg');
//file .env
require('dotenv').config();
//
var config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
};
var pool = new pg.Pool(config);
module.exports = pool;