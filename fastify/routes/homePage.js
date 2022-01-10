const homePage = (fastify, options, done) => {

    fastify.get('/', async (req, res) => {

        res.header('Content-Type', 'application/json');

        res.status(200).send({
            message: 'Hey there, Welcome to the DscJobs API! If you know what you are looking for Please provide a valid endpoint! Otherwise you can visit: https://docs.dscjobs.org',
            error: false,
            fatal: false,
            status: 200
        });
    });

    done();
}

module.exports = homePage;