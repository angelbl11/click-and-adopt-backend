const { User } = require("../../DataBase/User");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { CONFIG } = require("../../visionClient");
const path = require("path");
const fs = require("fs");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient(CONFIG);

const scanPetPicture = (url) => {
  client
    .labelDetection(url)
    .then((results) => {
      console.log(results);
      const labels = results[0].labelAnnotations;
      console.log("Labels:");
      if (
        labels[0].description == "Cat" ||
        labels[0].description == "cat" ||
        labels[0].description == "Dog" ||
        labels[0].description == "dog" ||
        labels[1].description == "Cat" ||
        labels[1].description == "cat" ||
        labels[1].description == "Dog" ||
        labels[1].description == "dog" ||
        labels[2].description == "Cat" ||
        labels[2].description == "cat" ||
        labels[2].description == "Dog" ||
        labels[2].description == "dog"
      ) {
        return true;
      }

      labels.forEach((label) => console.log(label.description));
      return false;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
  return "Imagen analizada";
};

async function detectFaces(inputFile) {
  // Make a call to the Vision API to detect the faces
  const results = await client.faceDetection(inputFile);
  const faces = results[0].faceAnnotations;
  const numFaces = faces.length;
  console.log(`Found ${numFaces} face${numFaces === 1 ? "" : "s"}.`);
  if (numFaces > 0) {
    console.log("verdadero, supera cero");
    return true;
  }
  console.log("falso, es cero");
  return false;
}

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

      if (
        (await detectFaces(
          `https://calm-forest-47055.herokuapp.com/ProfilePictures/${randomfileName}.jpg`
        )) === false
      ) {
        console.log("imagen no valida");
        throw new Error("No es una imagen valida");
      }

      await User.findByIdAndUpdate(id, {
        profilePicture: {
          filename: randomfileName + ".jpg",
          mimetype: mimetype,
          encoding: encoding,
        },
      });
      console.log("imagen valida");
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

      console.log(pathName);

      await stream.pipe(fs.createWriteStream(pathName));

      if (
        scanPetPicture(
          `https://calm-forest-47055.herokuapp.com/ProfilePictures/${randomfileName}.jpg`
        ) == false
      ) {
        throw new Error("La imagen no es de una mascota válida");
      }

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
        `../../Images/PetFiles/${fileName}`
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
