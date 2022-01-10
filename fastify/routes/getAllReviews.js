const Reviews = require('../../models/reviews');

const getAllReviews = async (fastify, options, done) => {

    fastify.get('/rev/:userID', {
        schema: {
            description: 'Fetch a specific review and view the review content',
            tags: ['get'],
            response: {
                200: {
                    description: 'Request was Successful',
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        userID: { type: 'string' },
                        content: { type: 'string' },
                        likes: { type: 'number' },
                        dislikes: { type: 'number'},
                        reports: { type: 'number' },
                        replies: { type: 'number' },
                        rate: { type: 'number' },
                        date: { type: 'number' }
                    }
                },
                400: {
                    description: '[DscJobs API] Hmm, We are unable to find that User. Please check the ID and try again!',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        error: { type: 'boolean' },
                        fatal: { type: 'boolean' },
                        status: { type: 'number' }
                    }
                },
                404: {
                    description: '[DscJobs API] Hmm, Seems like that User does not have any Reviews Available!',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        error: { type: 'boolean' },
                        fatal: { type: 'boolean' },
                        status: { type: 'number' }
                    }
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