require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongooseDB = require('./server/database/config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require("./server/routes"))

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

mongooseDB.open()
