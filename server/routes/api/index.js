const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/assignment', require('./assignment'))

module.exports = router