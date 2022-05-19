const { authenticateUser } = require("../../controllers/auth");

module.exports = route = ({ router, makeExpressCallback }) => {
  router.post("/", makeExpressCallback(authenticateUser));

  return router;
};
