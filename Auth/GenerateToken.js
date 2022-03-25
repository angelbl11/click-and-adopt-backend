const { sign } = require("jsonwebtoken");
const { KEY } = require("../config");

module.exports = {
	generateToken: (id, email, fullName) => {
		const token = sign(
			{
				id: id,
				email: email,
				fullName: fullName,
			},
			KEY
		);

		return token;
	},
};
