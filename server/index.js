const mongoose = require("mongoose");
const { MessageEmbed } = require('discord.js');
const config = require("../config.js");

module.exports = async (client) => {
    const { port } = require("../config");
    const fastify = require('fastify')({ logger: true });

    fastify.register(require('fastify-swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'fastify-api' },
        },
    });

    const routes = [
      
    ]
    routes.map(route => {
        fastify.register(require(route));
    })

    fastify.addHook('preHandler', (req, reply, done) => {
        req.client = client
        done()
      });
      
    const start = async () => {

        try {

            await fastify.listen(port, '0.0.0.0');

            console.log(`[DscJobs API] Listening to the Server on Port: ${port}`);

            let startLog = new MessageEmbed()
            .setTitle('API: Startup Successful')
            .setColor('#0EFF00')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription('The API is Online and Ready!')
            .setTimestamp()
            .setFooter('© 2021 DscJobs API', client.user.displayAvatarURL())
            
            await client.guilds.cache.get(config.guild).channels.cache.get(config.logChan).send({ embeds: [startLog] }); 

        } catch (error) {

            console.log(`[DscJobs API] Something went wrong here chief! | Error: ${error.stack}`);

            let errorLog = new MessageEmbed()
              .setTitle('500 - Internal Server Error')
              .setColor('RED')
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription('Woah, Something went wrong with the API')
              .addField('Error', `${error}`)
              .setTimestamp()
              .setFooter('© 2021 DscJobs API', client.user.displayAvatarURL())

              await client.guilds.cache.get(config.guild).channels.cache.get(config.logChan).send({ embeds: [errorLog] });
              
            process.exit(1);
        }
    }
    start();
};
