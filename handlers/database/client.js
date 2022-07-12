const mongoose = require("mongoose");
const settings = require("@Settings/index");
const Console = require("@Handlers/logger");

if (!settings.MongoURI)
  Console.SendLogs(
    "Please define the Mongo Connection String in the Client Config!",
    "error"
  );

module.exports.ClientDatabase = async (URI) => {
  await mongoose
    .connect(URI, {
      family: 4,
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    })
    .then(() => {
      Console.SendLogs("Connected to the Database Successfully", "ready");
    })
    .catch((err) => {
      Console.SendLogs(
        `Failed to Connect to the Database with ERROR: ${err.stack}`,
        "error"
      );
    });

  mongoose.connection.on("connected", () => {
    Console.SendLogs(
      `Database Connection has been established successfully!`,
      "ready"
    );
  });

  mongoose.connection.on("err", () => {
    Console.SendLogs(
      `Error occurred while establishing a Connection with Mongoose`,
      "error"
    );
  });

  mongoose.connection.on("disconnected", () => {
    Console.SendLogs(
      `Connection to the Database has been dropped... Please wait!!!`,
      "event"
    );
  });
};
