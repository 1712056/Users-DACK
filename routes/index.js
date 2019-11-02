var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index.html', function(req, res, next) {
  res.render('index');
});
router.get('/checkout.html', function(req, res, next) {
  res.render('checkout');
});
router.get('/contact.html', function(req, res, next) {
  res.render('contact');
});
router.get('/error.html', function(req, res, next) {
  res.render('error');
});
router.get('/products.html', function(req, res, next) {
  res.render('products');
});
router.get('/register.html', function(req, res, next) {
  res.render('register');
});
router.get('/signup.html', function(req, res, next) {
  res.render('signup');
});
router.get('/single.html', function(req, res, next) {
  res.render('single');
});
module.exports = router;
