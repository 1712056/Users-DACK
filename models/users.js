var pool =require('../models/data');

const findUser = async username => {
    const data = await pool.query('SELECT * FROM "users" WHERE "username"=$1',[username]);
  
    if (data.rows.length == 0) return null;
    return data.rows[0];
  };
  module.exports.findUser = findUser;