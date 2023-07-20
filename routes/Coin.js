const express = require('express');
const router = express.Router();
const coinHandler = require('../handlers/Coin.js');


router.get('/', coinHandler.print);


module.exports = router;