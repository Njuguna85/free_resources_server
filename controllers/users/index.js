const { addUser } = require("../../use-cases/users");

const makePostUser = require("./post-user");

const postUser = makePostUser({ addUser });

module.exports = {
  postUser,
};
