const express = require('express');
const router = express.Router();

const index = require('./routes/index');
const products = require('./routes/product');
const users = require('./routes/users');
const cart = require('./routes/cart');
const contact = require('./routes/contact');
const error = require('./routes/error');


router.use('/', index);
router.use('/', products);
router.use('/', users);
router.use('/', cart);
router.use('/', contact);
router.use('/', error);
module.exports = router;