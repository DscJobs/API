module.exports = (client) => {
    const { port } = require("../config");
    const fastify = require('fastify')({ logger: false });
    fastify.register(require('fastify-swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'fastify-api' },
        },
    });

    const routes = [
        //Get Requests
        //"./routes/getUserReviews",
        "./routes/getAllReviews",
        //"./routes/landingPage"
    ]
    routes.map(route => {
        fastify.register(require(route));
    })

    fastify.addHook('preHandler', (req, reply, done) => {
        req.client = client
        done()
      });
      
    const start = async () => {

        try {

            await fastify.listen(process.env.PORT, '0.0.0.0');

            console.log(`[DSCJobs-Logs] Listening to the Server on PORT: ${port}`);
            console.log(`[DSCJobs-Logs] Connected to the Discord API as ${client.user.username}`);

        } catch (error) {

            fastify.log.error(`[DSCJobs-Logs] Error: ${error} Stack: ${error.stack}`);

            process.exit(1);
        }
    }
    start();
};