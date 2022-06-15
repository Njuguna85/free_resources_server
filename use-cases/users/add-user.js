const generateToken = require("../../helpers/jwt");

module.exports = function makeAddUser({ buildUser }, userDb) {
  return async function addUser(userInfo) {
    let user = buildUser(userInfo);

    user = {
      fullName: user.getFullName(),
      email: user.getEmail(),
      organization: user.getOrganization(),
    };

    const newUser = await userDb.insertNewUser(user);

    let message;
    if (newUser) {
      // TODO:send email

      const token = generateToken(user);

      return {
        data: {
          userId: newUser.id,
          fullName: newUser.fullName,
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
