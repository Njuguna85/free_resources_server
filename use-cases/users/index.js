const buildUser = require("../../entities/Users/index"); // entity
const userDb = require("../../data-access/users"); // db queries

const makeAddUser = require("./add-user"); // use case

const addUser = makeAddUser(buildUser, userDb);

module.exports = {
  addUser,
};
