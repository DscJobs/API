module.exports = async (fastify, opts) => {
  fastify.get("/", (request, reply) => {
    reply.status(200).send({
      message:
        "Hey there, Welcome to the JobCord API! Please check our Documentation for Usage Info: https://docs.jobcord.co",
      version: "3.1.0",
      error: false,
      fatal: false,
      status: 200,
    });
  });
};
