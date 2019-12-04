const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
function initialize(passport, getUserByUsername, getUserById )
{
    const authenticateUser = async (username, password, done) =>
    {
        const user =getUserByUsername(username)
        if (user == null)
        {    
            return done(null, false, { message: 'Sai tài khoản hoặc mật khẩu'});
        }
        try{
            if (await bcrypt.compare(password, user.password))
            {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Sai mật khẩu'});
            }
        } catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameFied: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(user.id) ) 
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
    })
}

module.exports = initialize