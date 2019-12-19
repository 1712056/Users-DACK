const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
var usersModel = require("../models/users");
passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
passport.deserializeUser(async function(username, done) {
    const user = await usersModel.findUser(username);
    if (!user) {
      done(new Error("Tài khoản không tồn tại"));
    } else return done(null, user);
  });
passport.use(
    "local.login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      }, async function(req, username, password, done) 
      {
        const user = await usersModel.findUser(username);
        if (!user) {
          return done(null, false, {
            message: "Tài khoản không tồn tại, vui lòng nhập lại"
          });
        } else {
            
          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Sai mật khẩu, vui lòng nhập lại"
            });
          }
        }
      }
    )
  );
