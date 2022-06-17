const { generateToken } = require("../../Auth/GenerateToken");
const { User } = require("../../DataBase/User");
const { hash, compare } = require("bcryptjs");
const { validateRegister } = require("../../Auth/ValidateRegister");
const { UserInputError } = require("apollo-server-core");

module.exports = {
	register: async (parent, { registerInput }, context, info) => {
		try {
			const { account, age, email, fullName } = registerInput;
			let { password } = registerInput;

			const { errors, isValid } = validateRegister(
				registerInput.fullName,
				registerInput.email,
				registerInput.password,
				registerInput.repeatPassword
			);

			if (!isValid) {
				throw new UserInputError("Errors", { errors });
			}

			const isEmailTaken = await User.findOne({ email: email });

			if (isEmailTaken) {
				throw new UserInputError("Email, is taken", {
					errors: {
						email: "Ya existe una cuenta con este email",
					},
				});
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
				user.fullName
			);

			const userToReturn = {
				...user._doc,
				id: user.id,
				token: token,
			};

			return userToReturn;
		} catch (error) {
			console.log(error);
		}
	},

	login: async (parent, { loginInput }) => {
		try {
			const { email, password } = loginInput;

			const user = await User.findOne({ email: email });

			if (!user) {
				throw new UserInputError("Email, not exist", {
					errors: {
						email: "No existe una cuenta con este email",
					},
				});
			}

			if (!(await compare(password, user.password))) {
				throw new UserInputError("Wrong Credentials, bad password", {
					errors: {
						password: "Contraseña incorrecta",
					},
				});
			}

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
		} catch (error) {
			console.log(error);
		}
	},
};
