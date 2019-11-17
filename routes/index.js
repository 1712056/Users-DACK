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
  user: 'lwmtvkbdcppemz',
  database: 'd2ftd0sald3l3t',
  password: '8e53568db97c2950fa93af795d1dac6c2581239b483f0950bf86776af685d482',
  host: 'ec2-107-21-111-24.compute-1.amazonaws.com',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  ssl:true,
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
router.get('/chitiet:id',function(req, res, next){

  var id = req.params.id;
  parseInt(id);
  if(id==1 || id==9 || id==11)
  {
    id=2;
  }
  else if(id==2 || id==6)
  {
    id=1;
  }
  else if(id==3)
  {
    id=5;
  }
  else if(id==4 || id==12 ||id==11||id==13)
  {
    id=4;
  }
  else if(id==5)
  {
    id=3;
  }
  else if(id==7)
    {
      id=6;
    }
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT * FROM "Chitiet" WHERE "id"='+ id, (err, result) => {
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
