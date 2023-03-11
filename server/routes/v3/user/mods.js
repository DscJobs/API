const { fetchAllUsers } = require("@Handlers/database/users");

module.exports = async (fastify, opts) => {

  fastify.get("/mods/all", async (request, reply) => {

    let users = await fetchAllUsers();

      return reply.status(200).send(users);
  });
};