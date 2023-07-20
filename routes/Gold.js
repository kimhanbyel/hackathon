const express = require('express');
const router = express.Router();
const goldHandler = require('../handlers/Gold.js');

router.get('/', goldHandler.gold);


module.exports = router;