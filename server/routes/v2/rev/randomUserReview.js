const { fetchRandomUserReview } = require('@Handlers/database/reviews');

module.exports = async (fastify, opts) => {

    fastify.get('/random/:userID', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let reviews = await fetchRandomUserReview(request.params.userID);

        if (!reviews) return reply.status(404).send({
            message: 'Hmm, Seems like that User doesn\'t have any Reviews available!',
            error: true,
            fatal: false,
            status: 404
        });

        else if (reviews) return reply.status(200).send({
            _id: reviews._id,
            poster: reviews.userID || null,
            cv: reviews.cv || null,
            content: reviews.content,
            likes: reviews.likes || 0,
            dislikes: reviews.dislikes || 0,
            reports: reviews.reports || 0,
            replies: reviews.replies || 0,
            rating: reviews.rate || 0,
            date: reviews.date
        });

        else {

            return reply.status(400).send({
                message: 'Malformed Request. Please check the Provided Params and try again!',
                error: true,
                fatal: false,
                status: 400
            });
        }
    });
}