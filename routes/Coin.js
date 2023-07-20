const express = require('express');
const router = express.Router();
const coinHandler = require('../handlers/Coin.js');


router.get('/', (req,res) => {
    res.send('코인')});


module.exports = router;


