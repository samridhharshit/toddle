const express = require('express');
const router = express.Router();

// logout the user by setting the access token to ""
router.put('/logout', async (req, res) => { res.send(await logout(req.body.type, req.body.access_token)) })

module.exports = router