const { fetchAllReviews } = require("@Handlers/database/reviews");

module.exports = async (fastify, opts) => {
  fastify.get("/all", async (request, reply) => {
    reply.header("Content-Type", "application/json");

    let reviews = await fetchAllReviews();

    if (!reviews)
      return reply.status(404).send({
        message: "Hmm, Seems like there aren't any Reviews available!",
        error: true,
        fatal: false,
        status: 404,
      });
    else if (reviews) return reply.status(200).send({ reviews });
    else {
      return reply.status(400).send({
        message:
          "Malformed Request. Please check the Provided Params and try again!",
        error: true,
        fatal: false,
        status: 400,
      });
    }
  });
};
