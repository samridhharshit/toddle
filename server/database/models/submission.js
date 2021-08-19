const mongoose = require("mongoose")
const schema = mongoose.Schema

const submissionSchema = schema({
    s_id: String,
    a_id: String,
    remark: String
})

const submission = mongoose.model("submissions", submissionSchema)

module.exports = submission