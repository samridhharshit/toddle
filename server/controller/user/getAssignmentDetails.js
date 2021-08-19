const submission = require("../../database/models/submission");
const {ObjectId} = require("mongodb");

const getAssignmentDetails = async (assignment_id, user) => {
    // if assignment_id is invalid
    if (!ObjectId.isValid(assignment_id)) return { status: 422, msg: "Unprocessable Entity! Kindly check the assignment id." }

    if (user.type === "student") {
        try {
            return {
                status: 200,
                data: await submission.find({ a_id: assignment_id, s_id: user.id })
            }
        } catch (e) { return { status: 502, msg: e } }
    } else {
        try {
            return {
                status: 200,
                data: await submission.find({ a_id: assignment_id })
            }
        } catch (e) { return { status: 502, msg: e } }
    }
}

module.exports = getAssignmentDetails