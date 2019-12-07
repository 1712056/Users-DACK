
exports.login = function(req, res, next) {
    res.render('signup'), {error: req.flash("error")}};