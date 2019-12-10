var pool =require('../models/data');
/* GET Nam. */
exports.Filter= async function(req, res, next) {
    var product = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4)', [req.params.brand, req.params.user, req.params.type, 'ALL']);
    const countBrand = await pool.query('SELECT "Brand", "Gioitinh", COUNT(*) AS soluong  FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand", "Gioitinh"',[req.params.user]);
    const countType = await pool.query('SELECT "Loai","Gioitinh", COUNT(*) AS sl  FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai","Gioitinh" ',[req.params.user]);
    res.render("products",{
      product : product.rows,
      countBrand: countBrand.rows,
      countType : countType.rows,
    });
  };
