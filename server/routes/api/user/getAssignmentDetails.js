const express = require("express")
const router = express.Router()
const authMiddleware = require("../../../controller/auth/authMiddleware");
const getAssignmentDetails = require("../../../controller/user/getAssignmentDetails");

router.get('/:a_id', authMiddleware, async (req, res) => {  res.send(await getAssignmentDetails(req.params.a_id, req.user))})

module.exports = router