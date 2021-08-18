const express = require('express');
const router = express.Router();

router.use('/create', require('./create'))
router.use('/update', require('./update'))
router.use('/delete', require('./delete'))

module.exports = router