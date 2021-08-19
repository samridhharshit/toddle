const assignment = require("../../database/models/assignment");
const submission = require("../../database/models/submission");

const fetchAllAssignments = async (body, user) => {
    if (user.type === "teacher") {
        let assignments = []
        // get all assignments
        try {
            assignments = await assignment.find({ t_id: user.id })
        } catch (e) { return { status: 400, msg: e } }

        // filter by publish status
        if (body['publish'] === 'SCHEDULED')
            return { status: 200, data: assignments.filter(task => new Date() < new Date(task['published_at'])) }
        else if (body['publish'] === 'ONGOING')
            return { status: 200, data: assignments.filter(task => new Date(task['published_at']) <= new Date() && new Date() <= new Date(task['deadline'])) }
        else
            return { status: 200, data: assignments }
    } else { // handle for student

        // all the assignments allotted to the student
        const s_assignments = await assignment.find({ s_ids: { "$in": [user.id]} })

        // get all submissions made by the student
        const submissions = await submission.find({ s_id: user.id })

        const submitted_assignments_list = [] // ids of all the assignments submitted by the student
        for (let i = 0; i < submissions.length; i++) submitted_assignments_list.push(submissions[i].a_id)

        switch (body.status) {
            case "SUBMITTED": // those assignments which are in the submission model
                // scheduled assignments cannot be submitted --- only ongoing assignments can be submitted
                if (body['publish'] === "SCHEDULED")
                    return { status: 400, msg: "Bad Request! Not possible to have submitted assignment if its not ongoing." }
                else if (body['publish'] === "ONGOING") {
                    const submitted_assignments = s_assignments.filter(task => submitted_assignments_list.includes(task._id.toString()) && (new Date(task['published_at']) <= new Date() && new Date() <= new Date(task['deadline'])))
                    return { status: 200, data: submitted_assignments }
                } else {
                    const submitted_assignments = s_assignments.filter(task => submitted_assignments_list.includes(task._id.toString()))
                    return { status: 200, data: submitted_assignments }
                }
            case "PENDING": // those assignments which do not submissions and current date is in between publish date and deadline
                // scheduled assignments can be on pending --- ongoing assignments can be pending
                if (body['publish'] === "SCHEDULED") {
                    const pending_assignments = s_assignments.filter(task => !submitted_assignments_list.includes(task._id.toString()) && (new Date() < new Date(task['published_at'])))
                    return { status: 200, data: pending_assignments }
                } else if (body['publish'] === "ONGOING") {
                    const pending_assignments = s_assignments.filter(task => !submitted_assignments_list.includes(task._id.toString()) && (new Date(task['published_at']) <= new Date() && new Date() <= new Date(task['deadline'])))
                    return { status: 200, data: pending_assignments }
                } else {
                    const pending_assignments = s_assignments.filter(task => !submitted_assignments_list.includes(task._id.toString()))
                    return { status: 200, data: pending_assignments }
                }
            case "OVERDUE": // those assignments which are not submitted and current date is greater than deadline
                // scheduled assignments cannot be on overdue --- ongoing assignments cannot be overdue --- only assignments that passed their deadline can be on overdue
                if (body['publish'] === "SCHEDULED" || body['publish'] === "ONGOING") return { status: 400, msg: "Assignment is not_started_yet/still_ongoing. Hence not over due possible" }
                const overdue_assignments = s_assignments.filter(task => !submitted_assignments_list.includes(task._id.toString()) && (new Date() > new Date(task['deadline'])))
                return { status: 200, data: overdue_assignments }
            default:
                if (body['publish'] === "SCHEDULED")
                    return { status: 200, data: s_assignments.filter(a => new Date() < new Date(a['published_at']))}
                else if (body['publish'] === "ONGOING")
                    return { status: 200,  data: s_assignments.filter(a => new Date(a['published_at']) <= new Date() && new Date() <= new Date(a['deadline']))}
                else
                    return { status: 200, data: s_assignments }
        }
    }
}
module.exports = fetchAllAssignments