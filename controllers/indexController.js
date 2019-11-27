var pool =require('../models/data'); 
/* GET home page. */
exports.index = async function(req, res, next) {
    const index = await pool.query('SELECT * FROM "index" LIMIT 6');
    res.render("index",{
      index : index.rows
    });
  };
