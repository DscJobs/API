const { fetchUserCV } = require("@Handlers/database/curriculums");

module.exports = async (fastify, opts) => {

  fastify.get("/user/:userID", async (request, reply) => {

    let userCV = await fetchUserCV({ userID: request.params.userID });

    if (!userCV) return reply.status(500).send({
      message: 'Whoops, something went wrong here',
      err_msg: 'Unable to fetch recent curriculums',
      error: true,
      fatal: false,
      status: 500
    });

    else if (userCV) return reply.status(200).send({
        userCV
    })

    else {

      return reply.status(400).send({
        message: 'Malformed Request, Please check the provided params and try again!',
        error: true,
        fatal: false,
        status: 400
      })
    }
  });
};