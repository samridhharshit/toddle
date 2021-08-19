const assignment = require("../../database/models/assignment");

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

        // check for the current user in the list of s_ids for all assignments
        const s_assignments = await assignment.find({ s_ids: { "$in": [user.id]} })
        console.log(s_assignments)
        // const submissionsMade; // query all the submissions made by the current student

        switch (body.status) {
            case "SUBMITTED": // those assignments which are in the submission model

                break;
            case "PENDING": // those assignments which do not submissions and current date is in between publish date and deadline
                break;
            case "OVERDUE": // those assignments which do not submissions and current date is greater than deadline
                break;
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