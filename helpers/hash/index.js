const bcrypt = require("bcrypt");
const makeDecrypt = require("./decrypt");
const makeEncrypt = require("./encrypt");

const encrypt = makeEncrypt(bcrypt);
const decrypt = makeDecrypt(bcrypt);

module.exports = {
  encrypt,
  decrypt,
};
