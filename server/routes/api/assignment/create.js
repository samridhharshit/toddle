const express = require('express')
const createAssignment = require("../../../controller/Assignment/createAssignment");
const authMiddleware = require("../../../controller/auth/authMiddleware");
const router = express.Router()

router.post('/', authMiddleware, async (req, res) => { res.send(await createAssignment(req.body, req.user)) })

module.exports = router