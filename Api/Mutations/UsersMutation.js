const { User } = require("../../DataBase/User");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { CONFIG } = require("../../visionClient");
const path = require("path");
const fs = require("fs");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient(CONFIG);

const scanCatPicture = async (url) => {
  const results = await client.labelDetection(url);
  console.log(results);
  const labels = results[0].labelAnnotations;
  console.log("Labels:");
  labels.forEach((label) => console.log(label.description, label.score));
  if (
    (labels[0]?.score >= 0.9 && labels[0]?.description == "Cat") ||
    (labels[1]?.score >= 0.9 && labels[1]?.description == "cat")
  ) {
    console.log("es gato");
    return true;
  }
  console.log("no es gato");
  return false;
};

const scanDogPicture = async (url) => {
  const results = await client.labelDetection(url);
  console.log(results);
  const labels = results[0].labelAnnotations;
  console.log("Labels:");
  labels.forEach((label) => console.log(label.description));
  if (
    (labels[0]?.score >= 0.9 && labels[0]?.description == "Dog") ||
    (labels[1]?.score >= 0.9 && labels[1]?.description == "dog")
  ) {
    console.log("es perro");
    return true;
  }
  console.log("no es perro");
  return false;
};

async function detectFaces(inputFile) {
  // Make a call to the Vision API to detect the faces
  const results = await client.faceDetection(inputFile);
  const faces = results[0].faceAnnotations;
  const numFaces = faces.length;
  if (numFaces == 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  addProfilePicture: async (parent, { id, profilePicture }) => {
    const { createReadStream, filename, mimetype, encoding } =
      await profilePicture;

    const { ext } = path.parse(filename);

    let randomfileName = "";

    for (let i = 0; i < 15; i++) {
      randomfileName += Math.floor(Math.random() * 1000) + "";
    }

    const date = new Date();
    randomfileName += date.getDay() + date.getMonth() + date.getFullYear() + "";

    const stream = createReadStream();

    const pathName = path.join(
      __dirname,
      `../../Images/ProfilePictures/${randomfileName}` + ".jpg"
    );

    await stream.pipe(fs.createWriteStream(pathName));

    if (
      (await detectFaces(
        `https://calm-forest-47055.herokuapp.com/ProfilePictures/${randomfileName}.jpg`
      )) == false
    ) {
      throw new Error(
        "Por favor, seleccione una imagen válida o inténtelo de nuevo."
      );
    }

    await User.findByIdAndUpdate(id, {
      profilePicture: {
        filename: randomfileName + ".jpg",
        mimetype: mimetype,
        encoding: encoding,
      },
    });
    return "Listo";
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
    const { createReadStream, filename, mimetype, encoding } =
      await petProfilePicture;

    const { ext } = path.parse(filename);

    let randomfileName = "";

    for (let i = 0; i < 15; i++) {
      randomfileName += Math.floor(Math.random() * 1000) + "";
    }

    const date = new Date();
    randomfileName += date.getDay() + date.getMonth() + date.getFullYear() + "";

    const stream = createReadStream();

    const pathName = path.join(
      __dirname,
      `../../Images/ProfilePictures/${randomfileName}` + ".jpg"
    );

    console.log(pathName);

    await stream.pipe(fs.createWriteStream(pathName));

    const petInfo = await AdoptedQuestionnarie.findById(id);

    if (petInfo.typeOfAdoptedPet == "Gato") {
      if (
        (await scanCatPicture(
          `https://calm-forest-47055.herokuapp.com/ProfilePictures/${randomfileName}.jpg`
        )) == false
      )
        throw new Error(
          "Por favor, seleccione una imagen válida o inténtelo de nuevo."
        );
    } else if (petInfo.typeOfAdoptedPet == "Perro") {
      if (
        (await scanDogPicture(
          `https://calm-forest-47055.herokuapp.com/ProfilePictures/${randomfileName}.jpg`
        )) == false
      )
        throw new Error(
          "Por favor, seleccione una imagen válida o inténtelo de nuevo."
        );
    }

    await AdoptedQuestionnarie.findByIdAndUpdate(id, {
      petPicture: {
        filename: randomfileName + ".jpg",
        mimetype: mimetype,
        encoding: encoding,
      },
    });
    console.log("es una imagen valida");
    return "Listo";
  },
  addProtocolFile: async (parent, { id, protocolFile, fileName }) => {
    try {
      const { createReadStream, mimetype, encoding } = await protocolFile;

      const { ext } = path.parse(fileName);

      const stream = createReadStream();

      const pathName = path.join(
        __dirname,
        `../../Uploads/ProtocolFiles/${fileName}` + ".pdf"
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
