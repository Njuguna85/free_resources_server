const makeBuildUser = require("./user");
const { encrypt } = require("../../helpers/hash/index");

const buildUser = makeBuildUser(encrypt);

module.exports = { buildUser };
