//register
var pool =require('../models/data');
var bcrypt = require('bcryptjs');

exports.register = async function(req, res)
{
    try{
        const id = await Date.now();
        const username = await req.body.username;
        const password = await req.body.password;
        const hashedPwd = await bcrypt.hashSync(password);
        await pool.query('INSERT INTO users(id, username, password) VALUES ($1, $2, $3)',[id, username, hashedPwd]);
        const user = await pool.query('SELECT * FROM "users"');
        res.render("index",{
          index : index.rows,
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
              return req.user.username;
            }
          }
        })    
    } catch{
        res.render("dangky",{
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
              return req.user.username;
            }
          },
          error: req.flash("error")
    })}
};
//login
exports.login = function(req, res, next) {
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
            return req.user.username;
          }
        },
        error: req.flash("error")
      });
    }
    else res.redirect("/");
}
exports.logout = function (req, res){
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
          return req.user.username;
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