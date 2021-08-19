const mongoose = require("mongoose")
const schema = mongoose.Schema

const assignmentSchema = schema({
    s_ids: [String],
    t_id: String,
    desc: String,
    published_at: Date,
    deadline: Date,
})

const assignment = mongoose.model("assignments", assignmentSchema)

module.exports = assignment