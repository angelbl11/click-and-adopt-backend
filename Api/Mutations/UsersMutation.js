const { User } = require("../../DataBase/User");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { CONFIG } = require("../../visionClient");
const path = require("path");
const fs = require("fs");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient(CONFIG);

module.exports = {
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
  scanPicture: async (parent, { url }) => {
    client
      .labelDetection(url)
      .then((results) => {
        const labels = results[0].labelAnnotations;
        console.log("Labels:");
        labels.forEach((label) => console.log(label.description));
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    return "Imagen analizada";
  },

  deletePetInfo: async (parent, { petId }) => {
    try {
      await AdoptedQuestionnarie.findByIdAndDelete(petId);

      return "eliminado";
    } catch (error) {
      throw new Error(error);
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
  addProtocolFile: async (parent, { id, protocolFile, fileName }) => {
    try {
      const { createReadStream, mimetype, encoding } = await protocolFile;

      const { ext } = path.parse(fileName);

      const stream = createReadStream();

      const pathName = path.join(
        __dirname,
        `../../Images/ProfilePictures/${fileName}`
      );

      await stream.pipe(fs.createWriteStream(pathName));
      const user = await AdoptedQuestionnarie.findById(id);
      user.petProtocol.push({
        filename: fileName,
        mimetype: mimetype,
        encoding: encoding,
      });
      user.save();
      return "Listo";
    } catch (error) {
      console.log(error);
    }
  },
  deletePetInfo: async (parent, { petId }) => {
    try {
      let petInfoToDelete = AdoptedQuestionnarie.findByIdAndDelete(petId);
      await petInfoToDelete;
      return "eliminado";
    } catch (error) {
      throw new Error(error);
    }
  },
  editUserInfo: async (parent, { editInput, id }) => {
    try {
      const { email, fullName, age } = editInput;
      await User.findByIdAndUpdate(id, {
        email: email ? email : undefined,
        fullName: fullName ? fullName : undefined,
        age: age ? age : undefined,
      });
      return "Info actualizada";
    } catch (error) {
      console.log(error);
    }
  },
  updateAdopterStatus: async (parent, { id, userStatus }) => {
    try {
      console.log(userStatus);
      await AdopterQuestionnarie.findByIdAndUpdate(id, {
        isAvailableToAdopt: userStatus,
      });
      return "Estado actualizado";
    } catch (error) {
      console.log(error);
    }
  },

  updateAdoptedStatus: async (parent, { id, petStatus }) => {
    try {
      console.log(petStatus);
      await AdoptedQuestionnarie.findByIdAndUpdate(id, {
        isAvailableToBeAdopted: petStatus,
      });
      return "Estado actualizado";
    } catch (error) {
      console.log(error);
    }
  },
};
