const express = require('express');
const router = express.Router();

router.use('/login', require('./login'))
router.use('/signup', require('./signup'))
// router.get('/user_details', require('./userDetails'))

module.exports = router