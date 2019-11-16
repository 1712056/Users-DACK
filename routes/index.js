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
router.get('/sanpham', function(req, res, next) {
  res.render('products');
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
