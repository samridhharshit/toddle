const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(" ")[1]
    if (token === null) return res.sendStatus(401) // in case token not found

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403) // if token miss matched
        req.user = user
        next()
    })
}

module.exports = authMiddleware