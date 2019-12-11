var pool =require('../models/data');
/* GET Nam. */
exports.Filter= async function(req, res, next) {
    if (req.params.order == "Gia")
    {
      if (req.params.order2 == "giam")
        var product = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Gia" DESC', [req.params.brand, req.params.user, req.params.type, 'ALL']);
      else
        var product = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Gia"', [req.params.brand, req.params.user, req.params.type, 'ALL']);
    }
    else if (req.params.order == "Ten")
    {
      if (req.params.order2 == "giam")
        var product = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Ten" DESC', [req.params.brand, req.params.user, req.params.type, 'ALL']);
      else 
        var product = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Ten"', [req.params.brand, req.params.user, req.params.type, 'ALL']);
    }
    else
    {
      var product = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4)', [req.params.brand, req.params.user, req.params.type, 'ALL']);
    }
    const countBrand = await pool.query('SELECT "Brand", "Gioitinh", COUNT(*) AS soluong  FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand", "Gioitinh"',[req.params.user]);
    const countType = await pool.query('SELECT "Loai","Gioitinh", COUNT(*) AS sl  FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai","Gioitinh" ',[req.params.user]);
    console.log(product.rows);
    res.render("products",{
      product : product.rows,
      countBrand: countBrand.rows,
      countType : countType.rows,
      brand : req.params.brand,
      user : req.params.user,
      type: req.params.type,
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
    });
  };
