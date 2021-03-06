module.exports = function makeBuildUser(encrypt) {
  return function buildUser({ fullName, email, organization } = {}) {
    if (!fullName) {
      throw new Error("User must have a Full Name");
    }
    if (!email) {
      throw new Error("User must have an email");
    }

    return Object.freeze({
      getFullName: () => fullName,
      getEmail: () => email,
      getOrganization: () => organization,
    });
  };
};
