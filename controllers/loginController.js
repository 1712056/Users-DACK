
exports.login = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
      }
      const errors = req.flash().error || [];
      res.render('signup',
        {
          title: 'Đăng nhập',
          breadcrumb: 'Trang chủ / Khách / Đăng nhập',
          errors
        });
  };