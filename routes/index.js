var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/trangchu.html', function(req, res, next) {
  res.render('index');
});
router.get('/thanhtoan.html', function(req, res, next) {
  res.render('checkout');
});
router.get('/lienhe.html', function(req, res, next) {
  res.render('contact');
});
router.get('/error.html', function(req, res, next) {
  res.render('error');
});
router.get('/sanpham.html', function(req, res, next) {
  res.render('products');
});
router.get('/dangky.html', function(req, res, next) {
  res.render('register');
});
router.get('/dangnhap.html', function(req, res, next) {
  res.render('signup');
});
router.get('/chitiet.html', function(req, res, next) {
  res.render('single');
});
module.exports = router;
