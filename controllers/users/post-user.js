module.exports = function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const data = await addUser(httpRequest.body.payLoad);

      return {
        headers,
        statusCode: 201,
        body: { data },
      };
    } catch (err) {
      console.error("Error adding User", err);

      return {
        headers,
        statusCode: 400,
        body: {
          error: err.message,
        },
      };
    }
  };
};
