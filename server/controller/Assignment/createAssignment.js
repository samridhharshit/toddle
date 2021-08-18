const assignment = require("../../database/models/assignment");
const createAssignment = async (body, user) => {
    // check if all necessary details are provided
    if (!body.s_ids || !body.desc || !body.published_at || !body.deadline) return { status: 400, msg: "Data provided is incomplete! Please provide all necessary details." }

    // if no user or user type is not teacher
    if (!user || user.type !== "teacher") return { status: 401, msg: "Unauthorized!"}

    // check if the deadline is after the publish date
    if (new Date(body.deadline) < new Date(body.published_at)) return { status: 400, msg: "Deadline cannot be before date of publish" }

    // save assignment
    const assignmentObj = {...body, t_id: user.id}
    // set the status according to the published_at field
    new Date() < new Date(body.published_at) ? assignmentObj.status = "SCHEDULED" : assignmentObj.status = "ONGOING"

    return {
        status: 200,
        data: await new assignment(assignmentObj).save()
    }
}

module.exports = createAssignment