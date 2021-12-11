const { Client } = require("discord.js");
const client = new Client({ disableEveryone: true, disabledEvents: ["TYPING_START"], intents: 32767 });
const mongoose = require("mongoose");
const config = require("./config.js")
let api = require("./fastify/index");

client.on("ready", () => {
    api(client);
    mongoose.connect(config.mongoose, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.error(err);
        console.log("[DSCJobs-Logs] API Client is Online and has Connected to the Database!")
    });

    client.user.setActivity(`DscJobs API`, { type: 'WATCHING'});
});

client.login(config.token)