const { fetchUserReview } = require('@Handlers/database/reviews');

module.exports = async (fastify, opts) => {

    fastify.get('/:revID', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let reviews = await fetchUserReview(request.params.revID);

        if (!reviews) return reply.status(404).send({
            message: 'Invalid Review ID provided. Please check the Params and Try Again',
            error: true,
            fatal: false,
            status: 404
        });

        else if (reviews) return reply.status(200).send({ reviews });

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