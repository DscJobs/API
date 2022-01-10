const mongoose = require("mongoose");
const config = require("../configs/config");

module.exports = async (client) => {
    const { port } = require("../configs/config");
    const swagger = require("../configs/swagger");
    const fastify = require('fastify')({ logger: true });

    fastify.register(require('fastify-swagger'), swagger.options);

    const routes = [
        "./routes/homePage",
        "./routes/getAllReviews"
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

            console.log(`Listening to the Server on Port: ${port}, ${client.user.username} is Loaded.`);

        } catch (error) {

            fastify.log.error(error);

            process.exit(1);
        }
    }
    start();
};
