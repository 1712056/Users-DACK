var pool =require('../models/data');
var bcrypt = require('bcryptjs');

exports.register = async function(req, res)
{
    try{
        const id = await Date.now();
        const username = await req.body.username;
        const password = await req.body.password;
        const hashedPwd = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users(id, username, password) VALUES ($1, $2, $3)',[id, username, hashedPwd]);
        const user = await pool.query('SELECT * FROM "users"');
        res. redirect('/dangnhap');     
    } catch{
        res.redirect('/dangky');
    }
};

