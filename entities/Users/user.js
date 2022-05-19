module.exports = function makeBuildUser(encrypt) {
  return async function buildUser({
    fullName,
    email,
    organization,
    is_verified = false,
    password,
  } = {}) {
    if (!fullName) {
      throw new Error("User must have a First Name");
    }
    if (!email) {
      throw new Error("User must have an email");
    }
    if (!organization) {
      throw new Error("User must have an Organization");
    }
    if (!password) {
      throw new Error("User must have a Password");
    }
    let pwd = await encrypt(password);

    return Object.freeze({
      getFullName: () => fullName,
      getEmail: () => email,
      getOrganization: () => organization,
      getIsVerified: () => is_verified,
      getPassword: () => pwd,
    });
  };
};
