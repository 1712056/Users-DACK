//register
var pool =require('../models/data');
var bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports.getRegister = function(req, res, next) {
    res.render('register',{
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      }
    });
  }
module.exports.postRegister = async function(req, res)
{
    try{
        const id = await Date.now();
        const username = await req.body.username;
        const password = await req.body.password;
        const hashedPwd = await bcrypt.hashSync(password);
        const surname = await req.body.surname;
        const name = await req.body.name;
        const phone = await req.body.phone;
        const email = await req.body.email;
        await pool.query('INSERT INTO users(id, username, password, "Ho", "Ten", "SDT", "Email") VALUES ($1, $2, $3, $4, $5, $6, $7)',[id, username, hashedPwd, surname, name, phone, email]);
        res.redirect("/dangnhap")
    } catch{
        res.render("register",{
          title: "Đăng nhập",
          headerTop: function() {
            if (req.isAuthenticated()) {
              return "headAuthen";
            } else {
              return "headUnAuthen";
            }
          },
          username: function(){
            if(req.isAuthenticated())
            {
              return req.user.Ten;
            }
          },
          error: "Tài khoản đã tồn tại!"
    })}
};
//login
module.exports.getLogin = function(req, res, next) {
    if (req.isUnauthenticated()){
      res.render("login", {
        title: "Đăng nhập",
        headerTop: function() {
          if (req.isAuthenticated()) {
            return "headAuthen";
          } else {
            return "headUnAuthen";
          }
        },
        username: function(){
          if(req.isAuthenticated())
          {
            return req.user.Ten;
          }
        },
        error: req.flash("error")
      });
    }
    else res.redirect("/");
}
module.exports.postLogin = passport.authenticate("local.login", {
      successRedirect: "/",
      failureRedirect: "/dangnhap",
      failureFlash: true
    });
module.exports.getLogout = function (req, res){
  if (req.isUnauthenticated()){
    res.render("/", {
      title: "Đăng nhập",
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.Ten;
        }
      },
      error: req.flash("error")
    });
  }
  else 
  {
    req.logout();
    res.redirect("/");
  }
}
module.exports.getAccSet = function(req, res){
  res.render('profile',{
    headerTop: function() {
      if (req.isAuthenticated()) {
        return "headAuthen";
      } else {
        return "headUnAuthen";
      }
    },
    username: function(){
      if(req.isAuthenticated())
      {
        return req.user.Ten;
      }
    },
    phoneNum: function(){
      if(req.isAuthenticated())
      {
        return req.user.SDT;
      }
    },
    email: function(){
      if(req.isAuthenticated())
      {
        return req.user.email;
      }
    }
  }
 );
}
module.exports.postAccSet = function(req, res){
  
}