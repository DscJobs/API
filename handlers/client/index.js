require("module-alias/register");
require("dotenv").config();

const { Client, Intents } = require("discord.js");
const settings = require("@Settings/index");
const Console = require("@Handlers/logger");
const ClientEvents = require("@Handlers/client/events");

const client = new Client({
  shards: "auto",
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});

module.exports = client;

client.logger = Console;
client.config = settings;
client.limits = new Map();

ClientEvents(client);

client.login(settings.Token);
