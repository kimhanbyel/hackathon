const express = require('express');
const router = express.Router();
const stockHandler = require('../handlers/Stock.js');


router.get('/', stockHandler.stock);


module.exports = router;


