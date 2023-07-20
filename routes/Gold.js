const express = require('express');
const router = express.Router();
const goldHandler = require('../handlers/Gold.js');

router.get('/', (req,res) => {
    res.send('금')});
module.exports = router; 