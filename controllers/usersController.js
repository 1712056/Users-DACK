//register
var pool =require('../models/data');
var bcrypt = require('bcryptjs');
const passport = require('passport');
//register
module.exports.getRegister = function(req, res, next) {
  if(req.isUnauthenticated())
  {
    res.render("register", {
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
  else{
    res.redirect('/');
  }
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
//logout
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
//profile setting
module.exports.getAccSet = function(req, res){
  if(req.isAuthenticated())
  {
    res.render('profile',{
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      surname: function(){
        if(req.isAuthenticated())
        {
          return req.user.Ho;
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.username;
        }
      },
      name: function(){
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
          return req.user.Email;
        }
      }
    }
   );
  }
  else{
    res.redirect('/dangnhap');
  }
}
module.exports.postAccSet = async function(req, res){
    const surname = await req.body.surname;
    const name = await req.body.name;
    const phone = await req.body.phoneNum;
    const email = await req.body.email;
    await pool.query('UPDATE users SET "Ho"=$1, "Ten"=$2, "SDT"=$3, "Email"=$4 WHERE "username"=$5', [surname, name, phone, email, req.user.username]);
    res.redirect('/taikhoan')
}
//change password
module.exports.getChangePwd = function(req, res)
{
  if(req.isAuthenticated())
  {
    res.render('changePwd',{
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      surname: function(){
        if(req.isAuthenticated())
        {
          return req.user.Ho;
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.username;
        }
      },
      name: function(){
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
          return req.user.Email;
        }
      }
    }
   );
  }
  else{
    res.redirect('/dangnhap');
  }
}
module.exports.postChangePwd = async function(req, res)
{
  
  if (bcrypt.compareSync(req.body.pwdCur, req.user.password)) {
    const hashedPwd = await bcrypt.hashSync(req.body.password);
    await pool.query('UPDATE users SET "password"=$1 WHERE "username"=$2', [hashedPwd, req.user.username]);
    res.render('profile',{
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      surname: function(){
        if(req.isAuthenticated())
        {
          return req.user.Ho;
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.username;
        }
      },
      name: function(){
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
          return req.user.Email;
        }
      },
      message: "Cập nhật thành công!"
    }
   );
    
  }
  else{
    res.render('changePwd',{
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      surname: function(){
        if(req.isAuthenticated())
        {
          return req.user.Ho;
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.username;
        }
      },
      name: function(){
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
          return req.user.Email;
        }
      },
      error: "Sai mật khẩu hiện tại, vui lòng nhập lại"
    }
   );
    
  }
}