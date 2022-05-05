const { generateToken } = require("../../Auth/GenerateToken");
const { User } = require("../../DataBase/User");
const { hash, compare } = require("bcryptjs");
const { validateRegister } = require("../../Auth/ValidateRegister");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { GraphQLUpload } = require("graphql-upload");
const path = require("path");
const fs = require("fs");
module.exports = {
  resolvers: {
    Upload: GraphQLUpload,
    Query: {
      sayHi: () => {
        return "Hello world";
      },

      getAdopterInfo: async (parent, { id }, context) => {
        try {
          const userInfo = await User.findById(id);
          const adopterInfo = await AdopterQuestionnarie.findOne({
            userId: id,
          });

          return {
            userInfo: userInfo,
            adopterInfo: adopterInfo,
          };
        } catch (error) {
          throw new Error(error);
        }
      },
      getAdoptedInfo: async (parent, { id }, context) => {
        try {
          const pets = await AdoptedQuestionnarie.find({ userId: id });

          return pets;
        } catch (error) {
          throw new Error(error);
        }
      },
    },

    Mutation: {
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

          const token = generateToken(user.id, user.email, user.account);

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
            isAvailableToBeAdopted,
          } = adoptedQuestionnaireInput;

          if (!adoptedPetDescription) {
            throw {
              error: {
                adoptedPetDescription: "Campo vacío",
              },
            };
          }

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
            isAvailableToBeAdopted: isAvailableToBeAdopted,
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
          console.log("Usuario adoptante registrado");
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

          const token = generateToken(user.id, user.email, user.account);

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
      addProfilePicture: async (parent, { id, profilePicture }) => {
        try {
          const { createReadStream, filename, mimetype, encoding } =
            await profilePicture;

          const { ext } = path.parse(filename);

          let randomfileName = "";

          for (let i = 0; i < 15; i++) {
            randomfileName += Math.floor(Math.random() * 1000) + "";
          }

          const date = new Date();
          randomfileName +=
            date.getDay() + date.getMonth() + date.getFullYear() + "";

          const stream = createReadStream();

          const pathName = path.join(
            __dirname,
            `../../Images/ProfilePictures/${randomfileName}` + ".jpg"
          );

          await stream.pipe(fs.createWriteStream(pathName));

          await User.findByIdAndUpdate(id, {
            profilePicture: {
              filename: randomfileName + ".jpg",
              mimetype: mimetype,
              encoding: encoding,
            },
          });

          return "Listo";
        } catch (error) {
          console.log(error);
        }
      },
      addProfilePetPicture: async (parent, { id, petProfilePicture }) => {
        try {
          const { createReadStream, filename, mimetype, encoding } =
            await petProfilePicture;

          const { ext } = path.parse(filename);

          let randomfileName = "";

          for (let i = 0; i < 15; i++) {
            randomfileName += Math.floor(Math.random() * 1000) + "";
          }

          const date = new Date();
          randomfileName +=
            date.getDay() + date.getMonth() + date.getFullYear() + "";

          const stream = createReadStream();

          const pathName = path.join(
            __dirname,
            `../../Images/ProfilePictures/${randomfileName}` + ".jpg"
          );

          await stream.pipe(fs.createWriteStream(pathName));

          await AdoptedQuestionnarie.findByIdAndUpdate(id, {
            petPicture: {
              filename: randomfileName + ".jpg",
              mimetype: mimetype,
              encoding: encoding,
            },
          });

          return "Listo";
        } catch (error) {
          console.log(error);
        }
      },
      deletePetInfo: async (parent, { petId }) => {
        try {
          await AdoptedQuestionnarie.findByIdAndDelete(petId);

          return "eliminado";
        } catch (error) {
          throw new Error(error);
        }
      },
      editUserInfo: async (parent, { editInput, id }) => {
        try {
          const { email, fullName, age } = editInput;
          await User.findByIdAndUpdate(id, {
            email: email,
            fullName: fullName,
            age: age,
          });

          const isEmailTaken = await User.findOne({ email: email });

          if (isEmailTaken) {
            return "Este correo ya está registrado";
          } else {
            return "Info actualizada";
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateAdopterStatus: async (parent, { id, userStatus }) => {
        try {
          await AdopterQuestionnarie.findByIdAndUpdate(id, {
            isAvailableToAdopt: userStatus,
          });
          return "Estado actualizado";
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
};
