var pool =require('../models/data'); 
/* GET home page. */
module.exports = async function(req, res, next) {
  try {
    const index = await pool.query('SELECT * FROM "index" LIMIT 6 ');
    res.render("index",{
      index : index.rows,
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.username;
        }
      }
    }
    )
  } catch{
    
  }
  };
