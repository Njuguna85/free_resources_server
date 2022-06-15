const jwt = require("jsonwebtoken");

module.exports = generateToken = (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = (new Date().getTime() + 24 * 60 * 60 * 1000) / 1000;

  let token = jwt.sign(
    {
      payload: {
        email: user.email,
        user_id: user.id,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "540d",
    }
  );
  return { token, exp: Math.floor(exp), iat: iat };
};
