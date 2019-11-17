var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/trangchu', function(req, res, next) {
  res.render('index');
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
var pg = require('pg');
var config = {
  user: 'postgres',
  database: 'users-nair',
  password: '12345',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};
var pool = new pg.Pool(config);
router.get('/sanpham',function(req, res, next){


  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM "Giay"', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log();
      res.render("products", {data:result.rows});
    })
  })
});
router.get('/dangky', function(req, res, next) {
  res.render('register');
});
router.get('/dangnhap', function(req, res, next) {
  res.render('signup');
});
router.get('/chitiet', function(req, res, next) {
  res.render('single');
});
module.exports = router;
