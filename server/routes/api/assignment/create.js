const express = require('express')
const router = express.Router()
const createAssignment = require("../../../controller/assignment/createAssignment");
const authMiddleware = require("../../../controller/auth/authMiddleware");

router.post('/', authMiddleware, async (req, res) => { res.send(await createAssignment(req.body, req.user)) })

module.exports = router