const logger = require("../logger/logger");
const BaseError = require("../errors/baseError");

function logError({ msg, err }) {
  logger.error(msg, err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
