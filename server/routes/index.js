const express = require('express');
const router = express.Router();

router.use("/api", require('./api'))
router.get("/", (req, res) => {
    res.send({msg: "Welcome to toddle assignment mainframe api"})
})

module.exports = router
