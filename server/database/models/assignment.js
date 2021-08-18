const mongoose = require("mongoose")
const schema = mongoose.Schema

const assignmentSchema = schema({
    s_ids: Array,
    t_id: String,
    desc: String,
    published_at: Date,
    deadline: Date,
    status: String // SCHEDULED, ONGOING, ENDED
})

const assignment = mongoose.model("assignments", assignmentSchema)

module.exports = assignment