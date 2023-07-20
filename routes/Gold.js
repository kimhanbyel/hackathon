const express = require('express');
const router = express.Router();
const goldHandler = require('../handlers/Gold.js');

<<<<<<< HEAD

router.get('/', goldHandler.gold);


module.exports = router;
=======
router.get('/', (req,res) => {
    res.send('금')});
module.exports = router; 
>>>>>>> de801131e1be58b9d1c0f7264aba0d3f5758084b
