const { fetchTopDev } = require("@Handlers/database/curriculums");

module.exports = async (fastify, opts) => {

  fastify.get("/devs", async (request, reply) => {

    let cvArray = await fetchTopDev();

    if (!cvArray) return reply.status(500).send({
      message: 'Whoops, something went wrong here',
      err_msg: 'Unable to fetch recent curriculums',
      error: true,
      fatal: false,
      status: 500
    });

    else if (cvArray) return reply.status(200).send({
      cvArray
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