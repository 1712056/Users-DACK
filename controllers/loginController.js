
exports.login = function(req, res, next) {
    if (req.isUnauthenticated()) return next();
    else res.redirect("/");
  },
  function(req, res) {
    res.render("login", {
      title: "Đăng nhập",
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      error: req.flash("error")
    });
  };