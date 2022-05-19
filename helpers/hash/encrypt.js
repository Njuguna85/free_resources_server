module.exports = function makeEncrypt(bcrypt) {
  return async function encrypt(pwd) {
    const salt = await bcrypt.genSalt(10);

    let password = await bcrypt.hash(pwd, salt);

    return password;
  };
};
