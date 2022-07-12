const Console = require("@Handlers/logger");
const { readdirSync } = require("fs");

function ClientEvents(client) {
  readdirSync("./listeners/").forEach((file) => {
    const event = require(`../../listeners/${file}`);
    let eventName = file.split(".")[0];
    Console.SendLogs(`Loading Client Event: ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
  });
}

module.exports = ClientEvents;
