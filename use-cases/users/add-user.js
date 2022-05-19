const crypto = require("crypto");
const generateToken = require("../../helpers/jwt");

module.exports = function makeAddUser({ buildUser }, userDb) {
  return async function addUser(userInfo) {
    let user = await buildUser(userInfo);
    const token = crypto.randomBytes(32).toString("hex");

    user = {
      fullName: user.getFullName(),
      email: user.getEmail(),
      organization: user.getOrganization(),
      is_verified: user.getIsVerified(),
      password: user.getPassword(),
      verificationToken: token,
    };

    const exist = await userDb.checkUserExists({
      paramType: { param: "email" },
      paramValue: { param: user.email },
    });
    if (exist) return { error: { message: "Email Already taken" } };

    const newUser = await userDb.insertNewUser(user);

    let message;
    if (newUser) {
      // TODO:send email

    const token = generateToken(user);


      return { 
        data: {
          userId: newUser.id,
          fullName: newUser.fullName,
          isVerified: newUser.isVerified,
          email: newUser.email,
          token: token,
        },
       };
    } else {
      message = "Error Creating User.";
      return { error: { message } };
    }
  };
};
