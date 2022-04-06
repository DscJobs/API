const wl = require('@Settings/whitelist')
const { fetchDbUser } = require('@Handlers/database/users');

module.exports = async (fastify, opts) => {

    fastify.get('/reg/:userID', async (request, reply) => {

        let auth = request.headers.authorization || request.headers.Authorization;

        if (!auth) return reply.status(403).send({
            message: 'Forbidden: Please provide the DscJobs Admin Authorization Header!',
            error: true,
            fatal: false,
            status: 403
        });

        else if (auth !== wl.admins.auth) return reply.status(401).send({
            message: 'Unauthorized: Please provide the correct DscJobs Admin Authorization Header!',
            error: true,
            fatal: false,
            status: 401
        });

        else { 

            let user = await fetchDbUser(request.params.userID);

            if (!user) return reply.status(404).send({
                message: 'Seems like that user does not exist in our System!',
                error: true,
                fatal: false,
                status: 404
            });

            else if (!user.premium) return reply.status(409).send({
                message: 'Conflict Found: Provided User is not subscribed to our Premium Program',
                error: true,
                fatal: false,
                status: 409
            });

            else {

                await user.notifications.set("Congratulations!", "One of our Website Admins have provided you with Premium!");

                user.premium = false;
                user.lifetime = false;

                await user.save();

                return reply.status(200).send({
                    message: 'Okay, That user has been removed from our Premium Program',
                    error: false,
                    fatal: false,
                    status: 200
                });
            }
        }
    })
}