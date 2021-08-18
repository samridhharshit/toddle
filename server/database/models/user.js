const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = schema({
    username: String,
    password: String,
    type: String
})

const user = mongoose.model("users", userSchema)

module.exports = user
