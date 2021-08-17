const express = require('express')
const app = express()
// const process = require('./env')

const port = process.env.PORT || 5000

const mongooseDB = require('./server/database/config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require("./server/routes"))

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

mongooseDB.open()
