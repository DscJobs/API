const { Client } = require("discord.js");
const client = new Client({ disableEveryone: true, disabledEvents: ["TYPING_START"], intents: 32767 });
const mongoose = require("mongoose");
const config = require('./configs/config');
const api = require('./fastify/index');

client.on('ready', async () => {

    api(client);

    client.user.setActivity('api.dscjobs.org', { type: 'LISTENING'});

    await mongoose.connect(config.mongoose, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.error(err.stack);
        console.log('Failed to connect to the Database');
    });

    console.log('Connected to the Database Successfully');
});

client.login(config.token)

