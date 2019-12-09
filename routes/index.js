var express = require('express');
var router = express.Router();
const passport = require('passport');
const indexController = require('../controllers/indexController');
const productsController = require('../controllers/productsController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

/* GET */
router.get('/', indexController.index);
router.get('/Nam', productsController.Nam);
router.get('/Nu', productsController.Nu);
router.get('/Treem', productsController.Treem);
router.get('/Customise', productsController.Customise);

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
router.post('/register',registerController.register);
router.get('/dangnhap', loginController.login);
router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/dangnhap",
    failureFlash: true
  })
);
router.get('/:Ten', productsController.Single);
module.exports = router;
