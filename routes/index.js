var express = require('express');
var router = express.Router();
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

/* GET home page. */
router.get('/', async function(req, res, next) {
  const index = await pool.query('SELECT * FROM "index" LIMIT 6')
  
  res.render("index",{
    index : index.rows
  });
});
router.get('/Nam', async function(req, res, next) {
  const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Men']);
  const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand"',['Men']);
  const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Men']);
  res.render("products",{
    product : product.rows,
    countBrand: countBrand.rows,
    countType : countType.rows
  });
});
router.get('/Nu', async function(req, res, next) {
  const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Women']);
  const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" GROUP BY "Brand"');
  const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Women']);
  res.render("products",{
    product: product.rows,
    countBrand: countBrand.rows,
    countType : countType.rows
  });
});
router.get('/Treem', async function(req, res, next) {
  const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Kid']);
  const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" GROUP BY "Brand"');
  const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Kid']);
  res.render("products",{
    product : product.rows,
    countBrand: countBrand.rows,
    countType : countType.rows
  });
});
router.get('/Customise', async function(req, res, next) {
  const product = await pool.query('SELECT * FROM "index" WHERE "Gioitinh"=$1',['Customise']);
  const countBrand = await pool.query('SELECT "Brand", COUNT(*) AS soluong FROM "index" GROUP BY "Brand"');
  const countType = await pool.query('SELECT "Loai", COUNT(*) AS sl FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai" ',['Customise']);
  res.render("products",{
    product : product.rows,
    countBrand: countBrand.rows,
    countType : countType.rows
  });
});
router.get('/thanhtoan', function(req, res, next) {
  res.render('checkout');
});
router.get('/lienhe', function(req, res, next) {
  res.render('contact');
});
router.get('/error.html', function(req, res, next) {
  res.render('error');
});
router.get('/Nam?brand=:Brand', async function(req, res, next){
  console.log(Brand)
  const product = await pool.query('SELECT * FROM "index" WHERE "Brand"=$1',req.params.Brand);
  console.log(product);
  res.render("products",{
    product : product.rows
  });
});
router.get('/dangky', function(req, res, next) {
  res.render('register');
});
router.get('/dangnhap', function(req, res, next) {
  res.render('signup');
});
router.get('/chitiet:Gioitinh',function(req, res, next){
  
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM "detail" WHERE "Gioitinh"=$1', [req.params.Gioitinh], (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log();
      res.render("single", {data:result.rows});
    })
  })
});
module.exports = router;
