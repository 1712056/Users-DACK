const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
router.get('/user=:user&brand=:brand&type=:type&:order&:order2', productsController.getAllProducts);
router.get('/product=:product', productsController.getDetailProduct);
module.exports = router;
