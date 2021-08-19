const express = require('express');
const router = express.Router();

router.use('/create', require('./create'))
router.use('/update', require('./update'))
router.use('/delete', require('./delete'))
router.use('/fetch_all', require('./fetchAll'))
router.use('/submit', require('./submit'))

module.exports = router