const chalk = require("chalk");
const moment = require("moment");

module.exports = class Console {
  static SendLogs(content, type = "log") {
    const timestamp = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;

    switch (type) {
      case "log": {
        return console.log(
          `[LOGGER - ${chalk.gray(timestamp)}] | Type: ${chalk.black.bgBlue(
            type.toUpperCase()
          )} | Message: ${content}`
        );
      }
      case "warn": {
        return console.log(
          `[Warning - ${chalk.gray(timestamp)}] | Type: ${chalk.black.bgYellow(
            type.toUpperCase()
          )} | Message: ${content}`
        );
      }
      case "error": {
        return console.log(
          `[Error - ${chalk.gray(timestamp)}] | Type: ${chalk.black.bgRed(
            type.toUpperCase()
          )} | Message: ${content}`
        );
      }
      case "debug": {
        return console.log(
          `[Debug - ${chalk.gray(timestamp)}] | Type: ${chalk.black.bgYellow(
            type.toUpperCase()
          )} | Message: ${content}`
        );
      }
      case "event": {
        return console.log(
          `[Event - ${chalk.gray(timestamp)}] | Type: ${chalk.black.bgCyan(
            type.toUpperCase()
          )} | Message: ${content}`
        );
      }
      case "ready": {
        return console.log(
          `[Ready - ${chalk.gray(timestamp)}] | Type: ${chalk.black.bgGreen(
            type.toUpperCase()
          )} | Message: ${content}`
        );
      }

      default:
        throw new TypeError(
          `Logger type should be one of: "log, warn, error, debug, event or ready"`
        );
    }
  }
};
