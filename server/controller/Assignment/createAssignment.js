const assignment = require("../../database/models/assignment");
const createAssignment = async (body, user) => {
    // if no user or user type is not teacher
    if (!user || user.type !== "teacher") return { status: 401, msg: "Unauthorized!"}

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