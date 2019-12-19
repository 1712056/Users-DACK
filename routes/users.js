var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
/* GET POST users listing. */
router.get('/dangky', usersController.getRegister);
router.post('/dangky', usersController.postRegister);
router.get('/dangnhap', usersController.getLogin);
router.post('/dangnhap', usersController.postLogin);
router.get('/dangxuat', usersController.getLogout)

module.exports = router;
