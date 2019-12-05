var express = require('express');
var router = express.Router();
const pool = require('../models/data');
const passport = require('passport');
const indexController = require('../controllers/indexController');
const productsController = require('../controllers/productsController');
const registerController = require('../controllers/registerController');
const initializePassport = require('../config/passport');
const users = [];
initializePassport(passport, async username => {
  users = await pool.query('SELECT * FROM "users" WHERE "username"=$1',[username]);
  console.log(1);
  return users.rows.username;
}, async id =>{
  users = await pool.query('SELECT * FROM "users" WHERE "id"=$1',[id]);
  console.log(1);
  return users.rows.id;
})
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

router.get('/dangky', function(req, res, next) {
  res.render('register');
});
router.post('/register',registerController.register);
router.get('/dangnhap', function(req, res, next) {
  res.render('signup');
});
router.post('/login' , passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/dangnhap',
failureFlash: true }));
router.get('/chitiet:Ten',function(req, res, next){
  
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM "detail" WHERE "Ten"=$1', [req.params.Ten], (err, result) => {
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
