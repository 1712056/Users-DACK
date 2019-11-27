var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const productsController = require('../controllers/productsController');
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
