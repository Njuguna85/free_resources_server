const buildUser = require("../../entities/Users/index"); // entity
const userDb = require("../../data-access/users"); // db queries

const makeAddUser = require("./add-user"); // use case
const makeAuthUser = require("./auth-user");

const addUser = makeAddUser(buildUser, userDb);
const authUser = makeAuthUser(userDb);

module.exports = {
  addUser,
  authUser,
};
