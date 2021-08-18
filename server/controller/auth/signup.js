const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../database/models/user");

const signup = async (body) => {
    // any data not provided
    if (!Object.keys(body).length || !body.email || !body.password || !body.type) return { status: 404, msg: "user details incomplete!" }

    // if email already exists
    const userExists = await user.find({username: body.email})
    if (userExists.length > 0) return { status: 409, msg: "username already exists! Try another username" }

    // if type gets unrecognized value
    if (body.type !== "student" && body.type !== "teacher") return { status: 400, msg: "Bad Request!" }

    // create a hash of password
    const passwordHash = await bcrypt.hash(body.password, 10)
    const newUserObj = {
        username: body.email,
        password: passwordHash,
        type: body.type
    }
    // save user
    const newUser = await new user(newUserObj).save()

    // create jwt token
    const tokenObj = {
        id: newUser._id,
        username: newUser['username'],
        type: newUser['type']
    }

    const token = jwt.sign(tokenObj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    // return result
    return {
        status: 200,
        data: {...tokenObj, token}
    }
}

module.exports = signup

// console.log(await bcrypt.compare("passsdafukdhadsfword", passwordHash))
