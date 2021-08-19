const express = require('express')
const router = express.Router()
const authMiddleware = require("../../../controller/auth/authMiddleware");
const updateAssignment = require("../../../controller/assignment/updateAssignment");

router.patch('/:id', authMiddleware, async (req, res) => { res.send(await updateAssignment(req.params.id, req.body, req.user)) })

module.exports = router