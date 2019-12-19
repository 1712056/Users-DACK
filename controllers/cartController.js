

module.exports.cartShopping = function (req, res, next) {
  res.render('checkout',
    {
      headerTop: function () {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      username: function () {
        if (req.isAuthenticated()) {
          return req.user.username;
        }
      }
    });
};