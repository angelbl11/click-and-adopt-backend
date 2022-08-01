const { sign } = require("jsonwebtoken");
const { KEY } = require("../config");

module.exports = {
  generateToken: (id, email, account, age, fullName) => {
    const token = sign(
      {
        id: id,
        email: email,
        account: account,
        age: age,
        fullName: fullName,
      },
      KEY
    );

    return token;
  },
};
