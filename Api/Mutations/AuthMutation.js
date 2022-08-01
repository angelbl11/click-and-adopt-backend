const { generateToken } = require("../../Auth/GenerateToken");
const { User } = require("../../DataBase/User");
const { hash, compare } = require("bcryptjs");

module.exports = {
  register: async (parent, { registerInput }, context, info) => {
    const { account, age, email, fullName } = registerInput;
    let { password } = registerInput;
    const isEmailTaken = await User.findOne({ email: email });

    if (isEmailTaken) {
      throw new Error("Ya existe una cuenta registrada con este correo");
    }

    password = await hash(password, 10);

    const user = await new User({
      account: account,
      age: age,
      email: email,
      fullName: fullName,
      password: password,
    }).save();

    const token = generateToken(
      user.id,
      user.email,
      user.account,
      user.age,
      user.fullName,
      user.expoToken
    );

    const userToReturn = {
      ...user._doc,
      id: user.id,
      token: token,
    };

    return userToReturn;
  },

  login: async (parent, { loginInput }) => {
    const { email, password } = loginInput;

    const user = await User.findOne({ email: email });

    if (!user)
      throw new Error("No existe un usuario con los datos proporcionados");

    if (!(await compare(password, user.password)))
      throw new Error("Contraseña incorrecta");

    const token = generateToken(
      user.id,
      user.email,
      user.account,
      user.age,
      user.fullName
    );

    const userToReturn = {
      ...user._doc,
      id: user.id,
      token: token,
    };

    return userToReturn;
  },
};
