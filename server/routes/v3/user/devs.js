const { fetchAllDevs } = require("@Handlers/database/users");

module.exports = async (fastify, opts) => {

  fastify.get("/devs/all", async (request, reply) => {

    let devs = await fetchAllDevs();

      return reply.status(200).send(devs);
  });
};
