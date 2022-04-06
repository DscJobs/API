const { fetchDbUser } = require('@Handlers/database/users');

module.exports = async (fastify, opts) => {

    fastify.get('/premium/:userID', async (request, reply) => {

        let user = await fetchDbUser(request.params.userID);

        let cachedUser = await request.client.users.cache.get(user);

        if (!user) return reply.status(404).send({
            message: 'Unable to find that User in our System! Please check the User ID and try again!',
            error: true,
            fatal: false,
            status: 404
        })

        else if (user) return reply.status(200).send({
            userID: user.userID,
            hasPremium: user.premium
        });

        else {

            return reply.status(400).send({
                message: 'Malformed Request. Please check the Provided Params and try again!',
                error: true,
                fatal: false,
                status: 400
            })
        }
    })
}