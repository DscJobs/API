const wl = require("@Settings/whitelist");
const { createNewUser } = require("@Handlers/database/users");

module.exports = async (fastify, opts) => {
  fastify.get("/ban/:userID", async (request, reply) => {
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
      let user = await createNewUser(request.params.userID);

      if (!user)
        return reply.status(404).send({
          message: "Woah, That user does not exist in our System.",
          error: true,
          fatal: false,
          status: 404,
        });
      else if (user.banned)
        return reply.status(409).send({
          message: "Conflict Found: Provided User has already been banned!",
          error: true,
          fatal: false,
          status: 409,
        });
      else {
        user.notifications.set(
          "You have been banned!",
          "One of our Admins has banned you from accessing our Website. Please join our Discord Server to learn more info"
        );

        user.banner = true;

        await user.save();

        return reply.status(201).send({
          message: "Okay, User has been banned and Notified on their Profile.",
          error: true,
          fatal: false,
          status: 201,
        });
      }
    }
  });
};
