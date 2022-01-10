const Reviews = require('../../models/reviews');

const getAllReviews = async (fastify, options, done) => {

    fastify.get('/rev/:userID', {
        schema: {
            description: 'Fetch a specific review and view the review content',
            tags: ['get'],
            response: {
                200: {
                    _id: 'The ID for this Table in our Database',
                    userID: 'The Discord User ID/Snowflake to Fetch',
                    content: 'The Content of the Review (IE: What was said)',
                    likes: 'Number of Likes this Review has Received',
                    dislikes: 'Number of Dislikes this Review has Received',
                    reports: 'Number of times this Review has been Reported to Staff for Review',
                    replies: 'Number of Users who have Replied to this Review',
                    rate: 'The Rating for this Review (1-5)',
                    date: 'The Date that the Review was Posted!' 
                },
                400: {
                    message: '[DscJobs API] Hmm, We are unable to find that User. Please check the ID and try again!',
                    error: true,
                    fatal: false,
                    status: 400
                },
                404: {
                    message: '[DscJobs API] Hmm, Seems like that User does not have any Reviews Available!',
                    error: true,
                    fatal: false,
                    status: 404
                }
            }
        }
    }, async (req, res) => {

        res.header('Content-Type', 'application/json');

        let reviews = await Reviews.findOne({ userID: req.params.userID });

        if (!reviews) return res.status(404).send({
            message: '[DscJobs API] Hmm, Seems like that User does not have any Reviews Available!',
            error: true,
            fatal: false,
            status: 404
        });

        else if (reviews) {

            return res.status(200).send({
                _id: reviews._id,
                userID: reviews.userID,
                content: reviews.content,
                likes: reviews.likes || 0,
                dislikes: reviews.dislikes || 0,
                reports: reviews.reports || 0,
                replies: reviews.replies || 0,
                rate: reviews.rate || 0,
                date: reviews.date
            });
        } else {

            return res.status(400).send({
                message: '[DscJobs API] Hmm, We are unable to find that User. Please check the ID and try again!',
                error: true,
                fatal: false,
                status: 400
            });
        }
    });

    done();
}

module.exports = getAllReviews;