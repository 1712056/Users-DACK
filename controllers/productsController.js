var pool =require('../models/data');
/* GET Nam. */
exports.Nam = async function(req, res, next) {
    const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Men']);
    const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand"',['Men']);
    const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Men']);
    res.render("products",{
      product : product.rows,
      countBrand: countBrand.rows,
      countType : countType.rows
    });
  };
/* GET Nu. */
exports.Nu = async function(req, res, next) {
    const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Women']);
    const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand"',['Women']);
    const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Women']);
    res.render("products",{
      product: product.rows,
      countBrand: countBrand.rows,
      countType : countType.rows
    });
  };
/* GET Tre em. */
exports.Treem = async function(req, res, next) {
    const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Kid']);
    const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand"',['Kid']);
    const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Kid']);
    res.render("products",{
      product : product.rows,
      countBrand: countBrand.rows,
      countType : countType.rows
    });
  };
/* GET Customise. */
exports.Customise = async function(req, res, next) {
    const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Customise']);
    const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand"',['Customise']);
    const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Customise']);
    res.render("products",{
      product : product.rows,
      countBrand: countBrand.rows,
      countType : countType.rows
    });
  };

