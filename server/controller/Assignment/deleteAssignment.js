const {ObjectId} = require("mongodb");
const assignment = require("../../database/models/assignment");

const deleteAssignment = async (assignment_id, user) => {
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
            try {
                return {
                    status: 200,
                    data: await assignment.deleteOne({ _id: assignment_id })
                }
            } catch (e) {
                return {
                    status: 400,
                    msg: e
                }
            }
        }
    }
}

module.exports = deleteAssignment