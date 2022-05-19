const winston = require("winston");

const options = {
  combinedFile: {
    level: "info",
    filename: "./logs/combined-app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
  },
  errorFile: {
    level: "error",
    filename: "./logs/error-app.log",
    handleExceptions: true,
    json: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    //
    //Write all logs with importance level of `error` or less to `error-app.log`
    // - Write all logs with importance level of `info` or less to console
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
    // new winston.transports.File(options.combinedFile),
  ],
  exitOnError: false,
});

module.exports = logger;
