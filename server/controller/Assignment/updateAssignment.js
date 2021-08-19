const {ObjectId} = require("mongodb");
const assignment = require("../../database/models/assignment");

const updateAssignment = async (assignment_id, body, user) => {
    // if assignment_id is invalid
    if (!ObjectId.isValid(assignment_id)) return { status: 422, msg: "Unprocessable Entity! Kindly check the assignment id." }

    // if no user or user type is not teacher
    if (!user || user.type !== "teacher") return { status: 401, msg: "Unauthorized!"}

    // fetch assignment
    const Assignment = await assignment.find({ _id: assignment_id })

    // check if assignment exists
    if (Assignment.length === 0) return { status: 404, msg: "Assignment not found! Id must be incorrect." }
    else {
        // check if the assignment's t_id is equal to the current user's id.
        if (Assignment[0].t_id !== user.id) return { status: 401, msg: "Only the teacher that has created the assignment can make changes to the assignment!" }
        else {
            // check id the deadline is after the publish date
            if (body.deadline !== undefined) {
                if (
                    (
                        body.published_at !== undefined &&
                        new Date(body.deadline) < new Date(body.published_at )
                    ) ||
                    (
                        body.published_at === undefined &&
                        new Date(body.deadline) < new Date(Assignment[0].published_at)
                    )
                ) {
                    return {
                        status: 400,
                        msg: "Bad Request. deadline cannot be before publish date"
                    }
                }
            }
            // update fields
            const update = {
                s_ids: body.s_ids !== null ? body.s_ids : Assignment[0].s_ids,
                desc: body.desc !== null ? body.desc : Assignment[0].desc,
                published_at: body.published_at !== null ? body.published_at : Assignment[0].published_at,
                deadline: body.deadline !== null ? body.deadline : Assignment[0].deadline,
            }

            try {
                return {
                    status: 200,
                    data: await assignment.updateOne({ _id: assignment_id }, update)
                };
            } catch (e) {
                return {
                    status: 400,
                    msg: e
                }
            }

        }
    }
}

module.exports = updateAssignment