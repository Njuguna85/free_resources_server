const api500Error = require("../../helpers/errors/api500Error");
const { logError } = require("../../helpers/errors/errorHandler");

module.exports = function query({ models }) {
  return Object.freeze({ selectOne, insertNewUser , checkUserExists});

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

      return !!(user);
    } catch (err) {
      console.error("Error Fecthing User", err);
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
      user = await selectOne(user.id);

      return user;
    } catch (err) {
      await tr.rollback();
      console.error("Error Adding User", err);
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
      console.error("Error Fetching User", err);
    }
  }
};
