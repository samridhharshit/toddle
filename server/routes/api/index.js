const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/assignment', require('./assignment'))
router.use('/user', require('./user'))

module.exports = router