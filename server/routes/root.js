module.exports = async (fastify, opts) => {
    fastify.get('/', (request, reply) => {
        reply.status(200).send({
            message: 'Hey there, Welcome to the DscJobs API! Please check our Documentation for Usage Info: https://docs.dscjobs.org',
            error: false,
            fatal: false,
            status: 200
        })
    })
}