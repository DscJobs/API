module.exports = async (fastify, opts) => {
  fastify.get("/user/:userID", async (request, reply) => {
    reply.status(308).send({
      message:
        "v1 of our API has been Deprecated and is no longer supported. Please visit: https://docs.dscjobs.org",
      Location: "https://api.dscjobs.org/v2/*",
      error: false,
      fatal: false,
      status: 308,
    });
  });
};
