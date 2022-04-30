const { sign } = require("jsonwebtoken");
const { KEY } = require("../config");

module.exports = {
  generateToken: (id, email, account) => {
    const token = sign(
      {
        id: id,
        email: email,
        account: account,
      },
      KEY
    );

    return token;
  },
};
