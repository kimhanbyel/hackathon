const express = require('express');
const router = express.Router();
const stockHandler = require('../handlers/Stock.js');


router.get('/', (req,res) => {
    res.send('주식')});


module.exports = router;


