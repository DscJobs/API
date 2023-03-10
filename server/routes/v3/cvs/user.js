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
        userID: userCV.userID,
        overview: userCV.overview,
        hire: userCV.hire,
        birthday: userCV.birthday,
        link: userCV.link,
        email: userCV.email,
        job: userCV.job,
        vanity: userCV.vanity,
        private: userCV.private,
        developer: userCV.developer,
        current: userCV.current,
        exp_toggle: userCV.exp_toggle,
        nitro: userCV.nitro,
        views: userCV.views,
        likes: userCV.likes,
        date: userCV.date,
        salary: `$${userCV.details[0].salary}`,
        exp: `${userCV.details[0].exp} years`,
        exp_servers: userCV.details[0].exp_servers,
        activity: userCV.details[0].active,
        servers: userCV.servers
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