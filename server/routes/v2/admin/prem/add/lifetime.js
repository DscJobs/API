const wl = require("@Settings/whitelist");
const { fetchDbUser } = require("@Handlers/database/users");

module.exports = async (fastify, opts) => {
  fastify.get("/life/:userID", async (request, reply) => {
    let auth = request.headers.authorization || request.headers.Authorization;

    if (!auth)
      return reply.status(403).send({
        message:
          "Forbidden: Please provide the DscJobs Admin Authorization Header!",
        error: true,
        fatal: false,
        status: 403,
      });
    else if (auth !== wl.admins.auth)
      return reply.status(401).send({
        message:
          "Unauthorized: Please provide the correct DscJobs Admin Authorization Header!",
        error: true,
        fatal: false,
        status: 401,
      });
    else {
      let user = await fetchDbUser(request.params.userID);

      if (!user)
        return reply.status(404).send({
          message: "Seems like that user does not exist in our System!",
          error: true,
          fatal: false,
          status: 404,
        });
      else if (user.lifetime)
        return reply.status(409).send({
          message:
            "Conflict Found: Provided User is already subscribed to our Premium Program with a Lifetime Subscription",
          error: true,
          fatal: false,
          status: 409,
        });
      else {
        await user.notifications.set(
          "Congratulations!",
          "One of our Website Admins have provided you with a Liftime of Premium!"
        );

        user.premium = true;
        user.lifetime = true;

        await user.save();

        return reply.status(200).send({
          message:
            "Okay, That user has been added to our Premium Program with a Lifetime Subscription",
          error: false,
          fatal: false,
          status: 200,
        });
      }
    }
  });
};
