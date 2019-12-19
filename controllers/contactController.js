module.exports = function (req, res, next) {
    res.render('contact',
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