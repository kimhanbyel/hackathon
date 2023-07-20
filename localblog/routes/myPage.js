const express = require('express');
const router = express.Router();
const myPageHandler = require('../handlers/myPage');

router.use(myPageHandler.index);
router.get('/:userID/edit', myPageHandler.userEdit);
router.post('/:userID/editProcess', myPageHandler.userEditProcess)

module.exports = router;