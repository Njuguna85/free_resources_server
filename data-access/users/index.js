const models = require("../sequelize/models");
const query = require("./query");

const userDb = query({ models });

module.exports = userDb;
