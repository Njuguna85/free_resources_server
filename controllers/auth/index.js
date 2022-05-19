const makeAuthenticateUser = require("./auth-user");
const { authUser } = require("../../use-cases/users");

const authenticateUser = makeAuthenticateUser({ authUser });
module.exports = { authenticateUser };
