module.exports = function makeAuthenticateUser({ authUser }) {
  return async function authenticateUser(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const data = await authUser(httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: { ...data },
      };
    } catch (err) {
      console.error("Error Authenticating User", err);

      return {
        headers,
        statusCode: 401,
        body: {
          error: err.message,
        },
      };
    }
  };
};
