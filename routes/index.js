var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
/* GET */
router.get('/', indexController);
module.exports = router;
