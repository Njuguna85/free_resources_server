const { postUser } = require("../../controllers/users");

module.exports.route = ({ router, makeExpressCallback }) => {
  router.post("/", makeExpressCallback(postUser)); // create user

  return router;

};
