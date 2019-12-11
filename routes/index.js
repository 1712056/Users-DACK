var express = require('express');
var router = express.Router();
const passport = require('passport');
const indexController = require('../controllers/indexController');
const productsController = require('../controllers/productsController');
const usersController = require('../controllers/usersController');
var pool =require('../models/data');

/* GET */
router.get('/', indexController.index);
router.get('/user=:user&brand=:brand&type=:type&:order&:order2', productsController.Filter);

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
  res.render('register',{
    headerTop: function() {
      if (req.isAuthenticated()) {
        return "headAuthen";
      } else {
        return "headUnAuthen";
      }
    }
  });
});
router.post('/dangky',usersController.register);
router.get('/dangnhap', usersController.login);
router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/dangnhap",
    failureFlash: true
  })
);
router.get('/dangxuat',usersController.logout);
router.get('/product=:product', function(req, res, next){
  
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    pool.query('SELECT * FROM "index" as idx left join "detail" as dt ON idx.id = dt.id WHERE idx.id=$1', [req.params.product], (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows);
      res.render("single", {data: result.rows,headerTop: function() {
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
      }});
    })
  })
});
module.exports = router;
