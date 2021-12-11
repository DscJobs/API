const REVS = require('../../models/reviews');

const getAllReviews = async (fastify, options, done) => {

    fastify.get("/rev/:userID", async (req, res) => {

        res.header("Content-Type", "application/json");

        let revs = await REVS.findOne({ botID: req.params.botID });

        if (!revs) return res.status(404).send(JSON.stringify({
            message: '[DSCJobs-API] The User provided has no Reviews available!',
            error: true,
            fatal: false,
            status: 404
        }));


        if (revs) {

            return res.status(200).send(JSON.stringify({
                _id: revs._id,
                userID: revs.userID,
                content: revs.content,
                likes: revs.likes || 0,
                dislikes: revs.dislikes || 0,
                reports: revs.reports || 0,
                replies: revs.replies || 0,
                rate: revs.rate || 0,
                date: revs.date
            }))
        
        } else {

            return res.status(400).send(JSON.stringify({
                message: '[DSCJobs-API] Unable to find that User',
                error: true,
                fatal: false,
                status: 400
            }))
        }
    })

    done();
}

module.exports = getAllReviews;