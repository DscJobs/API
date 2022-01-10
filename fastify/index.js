module.exports = (client) => {
    const { port } = require("../configs/config");
    const fastify = require('fastify')({ logger: false });
    const swagger = require('../configs/swagger');
    fastify.register(require('fastify-swagger'), swagger.options);

    const routes = [
        // Get Routes
        "./routes/homePage",
        "./routes/getAllReviews",
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

            await fastify.listen(config.port, '0.0.0.0');
            await console.log(`[DSCJobs-Logs] Listening to the Server on PORT: ${port}`);
            await console.log(`[DSCJobs-Logs] Connected to the Discord API as ${client.user.username}`);

        } catch (error) {

            fastify.log.error(`[DSCJobs-Logs] Error: ${error} Stack: ${error.stack}`);

            process.exit(1);
        }
    }
    start();
};