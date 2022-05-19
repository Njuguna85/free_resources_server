const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class Api400Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "bad Request",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
    return { error: { message: this.name }, statusCode: this.statusCode };
  }
}

module.exports = Api400Error;
