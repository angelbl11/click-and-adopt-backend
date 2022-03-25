module.exports = {
	validateRegister: (fullName, email, password, confirmPassword) => {
		const errors = {};

		if (fullName.trim() === "") errors.fullName = "Usuario no ingresado";

		if (email.trim() === "") errors.email = "Correo no ingresado";
		else {
			const validator =
				/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

			if (!email.match(validator))
				errors.email =
					"Correo no valido, el formato del correo debe ser aa@aa.com";

			if (password.trim() === "") errors.password = "Contraseña no ingresada";
			else if (password.length < 8)
				errors.password = "La contraseña debe tener almenos 8 caracteres";
			else if (password !== confirmPassword)
				errors.password = "Las contraseñas no coinciden";

			const isValidationValid = {
				errors: errors,
				isValid: Object.keys(errors).length < 1,
			};

			return isValidationValid;
		}
	},
};
