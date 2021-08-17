const express = require('express')
const router = express.Router()

// logging in a user/restaurant - put request
router.put('/login', async (req, res) => { res.send(await login(req.body)) })

module.exports = router