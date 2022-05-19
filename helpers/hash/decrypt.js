module.exports = function makeDecrypt(bcrypt) {
  return async function decrypt(plainPwd, hashPwd) {
    let valid = await bcrypt.compare(plainPwd, hashPwd);
    return valid;
  };
};
