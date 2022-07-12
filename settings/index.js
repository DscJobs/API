require("dotenv").config();

module.exports = {
  Port: 4420,
  Token: process.env.TOKEN,
  MongoURI: process.env.MONGO,
  RedisURI: process.env.REDIS,
  Domain: process.env.DOMAIN,
  Status: process.env.STATUS,
  Guild: process.env.GUILD,
  LogChan: process.env.LOGS,
};
