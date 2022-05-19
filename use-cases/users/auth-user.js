const { decrypt } = require("../../helpers/hash");
const generateToken = require("../../helpers/jwt");

module.exports = function makeAuthUser(userDb) {
  return async function authUser(userInfo) {
    let { email, password: plainPwd } = userInfo;

    const exists = await userDb.checkUserExists({
      paramType: { param: "email" },
      paramValue: { param: email },
    });
    if (!exists) throw new Error("User account not found. Consider registering.");

    const user = await userDb.selectByEmail(email);

    const valid = await decrypt(plainPwd, user.password);
    if (!valid) throw new Error("Incorrect Password or Email.");

    const token = generateToken(user);

    
    return {
      data: {
        userId: user.id,
        fullName: user.fullName,
        isVerified: user.isVerified,
        email: user.email,
        token: token,
      },
    };
  };
};
