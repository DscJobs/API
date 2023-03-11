const { fetchDbUser } = require("@Handlers/database/users");

module.exports = async (fastify, opts) => {

  fastify.get("/:userID", async (request, reply) => {
    let user = await fetchDbUser(request.params.userID);

    let cachedUser = await request.client.users.cache.get(user);
    
    let fetch;
    let username;
    let discrim;

    if (!user)
      return reply.status(404).send({
        message:
          "Unable to find that User in our System! Please check the User ID and try again!",
        error: true,
        fatal: false,
        status: 404,
      });

    else if (user) {

      await request.client.users.fetch(user.userID).then(async u => {
        fetch = await u.displayAvatarURL({ dynamic: true });
        username = await u.username;
        discrim = await u.discriminator;
      });


      return reply.status(200).send({
        userAvatar: fetch,
        userName: username,
        userID: user.userID,
        discrim: discrim,
        votes: user.votes,
        rates: user.rates,
        banned: user.banned,
        staff: user.staff,
        premium: user.premium
      });

    } else {
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
