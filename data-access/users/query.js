const api500Error = require("../../helpers/errors/api500Error");
const { logError } = require("../../helpers/errors/errorHandler");

module.exports = function query({ models }) {
  return Object.freeze({
    selectOne,
    insertNewUser,
    checkUserExists,
    selectByEmail,
  });

  async function checkUserExists({ paramType, paramValue }) {
    /**
     * {
     *    paramType: { param: "email" }
     *    paramValue:{ param: "dnj445@gmail.com"}
     * }
     */
    let param = paramType["param"];
    let value = paramValue["param"];
    try {
      const user = await models.User.findOne({
        where: { [param]: value },
      });

      return !!user;
    } catch (err) {
      logError({ msg: "Error fetching user", err });
      throw err;
    }
  }

  async function insertNewUser(data) {
    const tr = await models.sequelize.transaction();

    try {
      let user = await models.User.create(
        {
          fullName: data.fullName,
          email: data.email,
          organization: data.organization,
          is_verified: false,
          password: data.password,
          verificationToken: data.verificationToken,
        },
        {
          transaction: tr,
        }
      );

      await tr.commit();
      user = await selectByEmail(user.email);

      return user;
    } catch (err) {
      await tr.rollback();
      logError({ msg: "Error adding user", err });
      throw err;
    
    }
  }

  async function selectOne(id) {
    try {
      let user = await models.User.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) return user;
      return { error: { message: "User Not found" } };
    } catch (err) {
     
      logError({ msg: "Error fetching user", err });
      throw err;
    }
  }

  async function selectByEmail(email) {
    try {
      let user = await models.User.findOne({
        where: { email: email },
        attributes: ["email", "password", "id", "fullName", "isVerified"],
      });

      return user;
    } catch (err) {
     
      logError({ msg: "Error fetching user", err });
      throw err;
    }
  }
};
