const express = require('express')
const router = express.Router()
const authMiddleware = require("../../../controller/auth/authMiddleware");
const submitAssignment = require("../../../controller/Assignment/submitAssignment");

router.post('/', authMiddleware, async (req, res) => { res.send(await submitAssignment(req.body, req.user)) })

module.exports = router