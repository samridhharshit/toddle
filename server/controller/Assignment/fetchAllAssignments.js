const assignment = require("../../database/models/assignment");
const fetchAllAssignments = async (user) => {
    if (user.type === "teacher") {
        return {
            status: 200,
            data: await assignment.find({ t_id: user.id })
        }
    } else {
        const assignments = await assignment.find()
        // filter out the assignments which are not assigned to the current user
        let results = []
        for (let i = 0; i < assignments.length; i++)
            if (assignments[i].s_ids.includes(user.id)) results.push(assignments[i])

        return {
            status: 200,
            data: results
        }
    }
}
module.exports = fetchAllAssignments