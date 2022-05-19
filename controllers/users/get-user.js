module.exports = function makeGetUser({ listUser }) {
    return async function getUser(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      let data;
  
      try {
        let { payload } = httpRequest;
        data = await listUser({ id: payload.user_id });
  
        return {
          headers,
          statusCode: 200,
          body: { data },
        };
      } catch (err) {
        console.error("Error Getting User at controller: ", err);
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
  