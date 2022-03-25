const { generateToken } = require("../../Auth/GenerateToken");
const { User } = require("../../DataBase/User");
const { hash, compare } = require("bcryptjs");
const { validateRegister } = require("../../Auth/ValidateRegister");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");

module.exports = {
	resolvers: {
		Query: {
			sayHi: () => {
				return "Hello world";
			},
		},

		Mutation: {
			register: async (parent, { registerInput }, context, info) => {
				const { account, age, email, fullName } = registerInput;
				let { password } = registerInput;

				const { errors, isValid } = validateRegister(
					registerInput.fullName,
					registerInput.email,
					registerInput.password,
					registerInput.repeatPassword
				);

				if (!isValid) throw { errors: errors };

				const isEmailTaken = await User.findOne({ email: email });

				if (isEmailTaken) {
					errors.email = "Este correo ya esta registrado";
					throw {
						errors: errors,
					};
				}

				password = await hash(password, 10);

				const user = await new User({
					account: account,
					age: age,
					email: email,
					fullName: fullName,
					password: password,
				}).save();

				const token = generateToken(user.id, user.email, user.fullName);

				const userToReturn = {
					...user._doc,
					id: user.id,
					token: token,
				};

				return userToReturn;
			},

			answerAdoptedQuestionnaire: async (
				parent,
				{ adoptedQuestionnaireInput }
			) => {
				try {
					const {
						userId,
						adoptedPetName,
						ageOfAdoptedPet,
						genderOfAdoptedPet,
						typeOfAdoptedPet,
						adoptedPetDescription,
						adoptedPetProtocol,
						coexistenceWithOtherPets,
						isHealthyWithKids,
						isHealthyWithOtherPets,
					} = adoptedQuestionnaireInput;

					if (!adoptedPetDescription)
						throw {
							error: {
								adoptedPetDescription: "Campo vacío",
							},
						};

					await new AdoptedQuestionnarie({
						userId: userId,
						adoptedPetName: adoptedPetName,
						ageOfAdoptedPet: ageOfAdoptedPet,
						genderOfAdoptedPet: genderOfAdoptedPet,
						typeOfAdoptedPet: typeOfAdoptedPet,
						adoptedPetDescription: adoptedPetDescription,
						adoptedPetProtocol: adoptedPetProtocol,
						coexistenceWithOtherPets: coexistenceWithOtherPets,
						isHealthyWithKids: isHealthyWithKids,
						isHealthyWithOtherPets: isHealthyWithOtherPets,
					}).save();

					return "Cuestionario completado";
				} catch (error) {
					console.log(error);
				}
			},

			answerAdopterQuestionnaire: async (
				parent,
				{ adopterQuestionnaireInput }
			) => {
				try {
					console.log("hola");
					await new AdopterQuestionnarie(adopterQuestionnaireInput).save();
					return "Listo";
				} catch (error) {
					console.log(error);
				}
			},

			login: async (parent, { loginInput }) => {
				try {
					const { email, password } = loginInput;

					const user = await User.findOne({ email: email });

					if (!user) {
						throw {
							error: "Email no encontrado",
						};
					}

					if (!(await compare(password, user.password))) {
						throw {
							error: "Contraseña Incorrecta",
						};
					}

					const token = generateToken(user.id, user.email, user.fullName);

					const userToReturn = {
						...user._doc,
						id: user.id,
						token: token,
					};

					return userToReturn;
					s;
				} catch (error) {
					console.log(error);
				}
			},
		},
	},
};
