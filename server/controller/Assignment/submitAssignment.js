const {ObjectId} = require("mongodb");
const assignment = require("../../database/models/assignment");
const submission = require("../../database/models/submission");

const submitAssignment = async (body, user) => {
    // check if body is not complete
    if (
        !body.a_id ||
        !body.remark
    ) return { status: 400, msg: "Incomplete data provided." }

    // check if the submitter is a student
    if (user.type !== "student") return { status: 401, msg: "Only a student could make a submission!" }

    // check if the assignment id is processable
    if (!ObjectId.isValid(body.a_id))
        return { status: 422, msg: "Unprocessable Entity! Id provided are incorrect" }

    // query assignment with provided id
    let Assignment;
    try {
        Assignment = await assignment.findOne({ _id: body.a_id })
    } catch (e) { return { status: 400, msg: e } }

    // check if assignment with given id exists or not
    if (!Assignment || Assignment.length === 0) return { status: 400, msg: "Assignment with provided id does not exist!" }

    // check if the assignment is allotted to the current student
    if (!Assignment.s_ids.includes(user.id))
        return { status: 401, msg: "You are not authorized to make the submission as this assignment hasn't been allotted to you." }

    // query submission model and check if a submission already exists for the given student id and assignment id
    let submitted;
    try {
        submitted = await submission.findOne({ s_id: user.id,a_id: body.a_id })
    } catch (e) { return { status: 400, msg: e } }

    // check if the assignment has not been submitted already
    if (submitted) return { status: 409, msg: "Cannot make another submission!" }

    // make the submission
    try {
        const submitObj = {
            s_id: user.id,
            a_id: body.a_id,
            remark: body.remark
        }
        // submission successful
        return {
            status: 200,
            data: await new submission(submitObj).save()
        }
    } catch (e) { return { status: 400, msg: e } }
}

module.exports = submitAssignment