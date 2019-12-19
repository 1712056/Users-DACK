var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cartController');

router.get('/thanhtoan', cartController.cartShopping);
module.exports = router;