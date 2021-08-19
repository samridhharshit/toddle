const express = require('express');
const router = express.Router();

router.use('/fetch_all', require('./fetchAll'))
router.use('/submit', require('./submitAssignment'))
router.use('/fetch_assignment_details', require('./getAssignmentDetails'))

module.exports = router