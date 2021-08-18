const express = require('express')
const login = require("../../../controller/auth/login");
const router = express.Router()

// logging in a user
router.post('/', async (req, res) => { res.send(await login(req.body)) })

module.exports = router