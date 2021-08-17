const express = require('express');
const router = express.Router();

// register user/restaurant
router.post('/register', async (req, res) => { res.send(await register(req.body)) })

module.exports = router