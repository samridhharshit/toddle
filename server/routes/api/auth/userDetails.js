const express = require('express');
const router = express.Router();

// get user details using access_token
router.get('/get_user_details/:access_token', async (req, res) => { res.send(await getUserDetails(req.params.access_token)) })

module.exports = router