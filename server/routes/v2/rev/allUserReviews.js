const { fetchAllUserReviews } = require("@Handlers/database/reviews");

module.exports = async (fastify, opts) => {
  fastify.get(
    "/all/:userID",
    {
      config: {
        rateLimit: {
          max: 100,
          timeWindow: 900000,
          errorResponseBuilder: function (request, context) {
            return {
              code: 420,
              error: "Enhance your Calm",
              message: `Woah. Slow down chief! Maximum ${this.max} requests per 15 Minutes`,
              date: Date.now(),
              expiresIn: this.timeWindow,
            };
          },
          onExceeding: function (request, response) {
            return {
              code: 420,
              error: "Enhance your Calm!",
              message: `You are making to many Requests and will be Rate Limited soon. Max is ${this.max} Req per 15 Mins`,
            };
          },
          onExceeded: function (request, response) {
            return {
              code: 420,
              error: "Enhance your Calm",
              message: `Woah. Slow down chief! Maximum ${this.max} requests per 15 Minutes`,
              date: Date.now(),
              expiresIn: this.timeWindow,
            };
          },
        },
      },
    },
    async (request, reply) => {
      reply.header("Content-Type", "application/json");

      let reviews = await fetchAllUserReviews(request.params.userID);

      if (!reviews)
        return reply.status(404).send({
          message:
            "Hmm, Seems like that User doesn't have any Reviews available!",
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
    }
  );
};
