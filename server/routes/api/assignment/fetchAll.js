const express = require('express')
const router = express.Router()
const authMiddleware = require("../../../controller/auth/authMiddleware");
const fetchAllAssignments = require("../../../controller/Assignment/fetchAllAssignments");

router.get('/', authMiddleware, async (req, res) => { res.send(await fetchAllAssignments(req.body, req.user)) })

module.exports = router