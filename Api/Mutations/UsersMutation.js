const { User } = require("../../DataBase/User");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { CONFIG } = require("../../visionClient");
const path = require("path");
const fs = require("fs");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient(CONFIG);

const scanPetPicture = async (url) => {
  const results = await client.labelDetection(url);
  console.log(results);
  const labels = results[0].labelAnnotations;
  console.log("Labels:");
  if (
    labels[0]?.description == "Cat" ||
    labels[0]?.description == "cat" ||
    labels[0]?.description == "Dog" ||
    labels[0]?.description == "dog" ||
    labels[1]?.description == "Cat" ||
    labels[1]?.description == "cat" ||
    labels[1]?.description == "Dog" ||
    labels[1]?.description == "dog" ||
    labels[2]?.description == "Cat" ||
    labels[2]?.description == "cat" ||
    labels[2]?.description == "Dog" ||
    labels[2]?.description == "dog"
  ) {
    console.log("es mascota");
    return true;
  }
  labels.forEach((label) => console.log(label.description));
  console.log("falso, no es mascota");
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
        "Por favor, utilice una fotografía suya; además, se recomienda que en esta se aprecie correctamente el rostro, sin accesorios que lo obstruyan y se pueda visualizar de frente. En caso de que la fotografía que intenta subir cumpla los requisitos, por favor, vuelva a intentar el proceso."
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

    if (
      (await scanPetPicture(
        `https://calm-forest-47055.herokuapp.com/ProfilePictures/${randomfileName}.jpg`
      )) == false
    ) {
      console.log("no es una imagen valida");
      throw new Error("La imagen no es de una mascota válida");
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
