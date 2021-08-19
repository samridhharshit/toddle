const express = require('express')
const router = express.Router()
const authMiddleware = require("../../../controller/auth/authMiddleware");
const deleteAssignment = require("../../../controller/assignment/deleteAssignment");

router.delete('/:id', authMiddleware, async (req, res) => { res.send(await deleteAssignment(req.params.id, req.user)) })

module.exports = router