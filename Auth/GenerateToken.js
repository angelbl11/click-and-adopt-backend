const { sign } = require("jsonwebtoken");
const { KEY } = require("../config");

module.exports = {
  generateToken: (id, email, account, age, fullName, expoToken) => {
    const token = sign(
      {
        id: id,
        email: email,
        account: account,
        age: age,
        fullName: fullName,
        expoToken: expoToken,
      },
      KEY
    );

    return token;
  },
};
