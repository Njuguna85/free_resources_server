const api500Error = require("../../helpers/errors/api500Error");
const { logError } = require("../../helpers/errors/errorHandler");

module.exports = function query({ models }) {
  return Object.freeze({
    insertNewUser,
    selectByEmail,
  });

  async function insertNewUser(data) {
    const tr = await models.sequelize.transaction();

    try {
      let user;
      user = await selectByEmail(data.email);
      if (!user) {
        user = await models.User.create(
          {
            fullName: data.fullName,
            email: data.email,
            organization: data.organization,
          },
          {
            transaction: tr,
          }
        );

        await tr.commit();
        user = await selectByEmail(user.email);
      }
      return user;
    } catch (err) {
      await tr.rollback();
      logError({ msg: "Error adding user", err });
      return new api500Error("Error registering user");
    }
  }

  async function selectByEmail(email) {
    try {
      return await models.User.findOne({
        where: { email: email },
        attributes: ["email", "id", "fullName", "organization"],
      });
    } catch (err) {
      logError({ msg: "Error fetching user", err });
      return new api500Error("Error fetching User");
    }
  }
};
