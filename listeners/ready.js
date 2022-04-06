const { ClientDatabase } = require('@Handlers/database/client');
const ClientWebServer = require('@Server/index');
const { MongoURI } = require('@Settings/index');
const Console = require('@Handlers/logger');

module.exports = async (client) => {

    await ClientDatabase(MongoURI);

    await ClientWebServer(client);

    Console.SendLogs(`Client is Online and Ready to interact with Discord Users!`, 'ready');

    client.user.setActivity('api.dscjobs.org', { type: 'WATCHING' });
}