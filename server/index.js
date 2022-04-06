const { Port, RedisURI } = require('@Settings/index');
const Console = require('@Handlers/logger');
const Redis = require('ioredis');
const redisDB = require('redis');
const path = require('path')

module.exports = async (client) => {

    const redis = new Redis(RedisURI);

    Console.SendLogs('Connected to the Redis Database...', 'ready');

    const fastify = require('fastify')({ logger: true });

    fastify.register(require('fastify-rate-limit'), {
        max: 3000,
        redis: redis,
        global: false,
        skipOnError: true,
        timeWindow: '15 Minutes',
        addHeadersOnExceeding: {
          'x-ratelimit-limit': true,
          'x-ratelimit-remaining': true,
          'x-ratelimit-reset': true
        },
        addHeaders: {
          'x-ratelimit-limit': true,
          'x-ratelimit-remaining': true,
          'x-ratelimit-reset': true,
          'retry-after': true
        }
    });

    fastify.register(require('fastify-autoload'), { 
        dir: path.join(__dirname, 'routes') 
    });

    fastify.addHook('preHandler', (req, res, done) => {
        req.client = client;
        done();
    });

    const start = async () => {
        try {
            await fastify.listen(Port, '0.0.0.0');

            Console.SendLogs(`Web Server is Ready on PORT: ${Port}`, 'ready');

        } catch (err) {

            Console.SendLogs(`Error Occurred while starting the Web Server`, 'error')
            fastify.log.error(err.stack);

            process.exit(1);
        }
    }

    start();
}