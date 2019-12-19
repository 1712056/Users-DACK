module.exports.getStateAuthenticated = (req, res, next) => {
    res.locals.user = req.user;
    res.locals.authenticated = req.isAuthenticated();
    console.log(res.locals);
    next();
  };