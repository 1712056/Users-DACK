var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
/* GET POST users listing. */
router.get('/dangky', usersController.getRegister);
router.post('/dangky', usersController.postRegister);
router.get('/dangnhap', usersController.getLogin);
router.post('/dangnhap', usersController.postLogin);
router.get('/dangxuat', usersController.getLogout);
router.get('/taikhoan', usersController.getAccSet);
router.post('/taikhoan', usersController.postAccSet);
router.get('/taikhoan/doimatkhau',usersController.getChangePwd);
router.post('/taikhoan/doimatkhau', usersController.postChangePwd);
module.exports = router;
