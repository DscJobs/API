const { Port, RedisURI } = require("@Settings/index");
const Console = require("@Handlers/logger");
const path = require("path");

module.exports = async (client) => {

  const fastify = require("fastify")({ logger: true });

  fastify.register(require("@fastify/autoload"), {
    dir: path.join(__dirname, "routes"),
  });

  fastify.addHook("preHandler", (req, res, done) => {
    req.client = client;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",  "*");
    done();
  });

  fastify.setNotFoundHandler(function (request, reply) {
    reply.code(404).send({
      message:
        "Whatever you are looking for does not exist here. Please check our Documentation: https://docs.jobcord.co",
      error: true,
      fatal: false,
      status: 404,
    });
  });

  const start = async () => {
    try {
      
      await fastify.listen({
        port: Port,
        host: '0.0.0.0'
      })

      Console.SendLogs(`Web Server is Ready on PORT: ${Port}`, "ready");
    } catch (err) {
      Console.SendLogs(`Error Occurred while starting the Web Server`, "error");
      fastify.log.error(err.stack);

      process.exit(1);
    }
  };

  start();
};
