const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class Api500Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = "Internal Server error.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
    return { error: { message: this.name }, statusCode: this.statusCode };
  }
}

module.exports = Api500Error;
