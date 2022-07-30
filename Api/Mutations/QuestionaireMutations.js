const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");

module.exports = {
  answerAdoptedQuestionnaire: async (parent, { adoptedQuestionnaireInput }) => {
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

      const newAdopted = await new AdoptedQuestionnarie({
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

      return newAdopted.id;
    } catch (error) {
      console.log(error);
    }
  },

  answerAdopterQuestionnaire: async (parent, { adopterQuestionnaireInput }) => {
    try {
      console.log("Usuario adoptante registrado");
      adopterQuestionnaireInput.isAvailableToAdopt = false;
      await new AdopterQuestionnarie(adopterQuestionnaireInput).save();
      return "Listo";
    } catch (error) {
      console.log(error);
    }
  },

  editPetInfo: async (parent, { editPetInput, petId }) => {
    try {
      const {
        adoptedPetName,
        ageOfAdoptedPet,
        genderOfAdoptedPet,
        adoptedPetDescription,
        adoptedPetProtocol,
        coexistenceWithOtherPets,
        isHealthyWithKids,
        isHealthyWithOtherPets,
      } = editPetInput;
      await AdoptedQuestionnarie.findByIdAndUpdate(petId, {
        adoptedPetName: adoptedPetName ? adoptedPetName : undefined,
        ageOfAdoptedPet: ageOfAdoptedPet ? ageOfAdoptedPet : undefined,
        genderOfAdoptedPet: genderOfAdoptedPet ? genderOfAdoptedPet : undefined,
        adoptedPetDescription: adoptedPetDescription
          ? adoptedPetDescription
          : undefined,
        adoptedPetProtocol: adoptedPetProtocol ? adoptedPetProtocol : undefined,
        coexistenceWithOtherPets: coexistenceWithOtherPets
          ? coexistenceWithOtherPets
          : undefined,
        isHealthyWithKids: isHealthyWithKids ? isHealthyWithKids : undefined,
        isHealthyWithOtherPets: isHealthyWithOtherPets
          ? isHealthyWithOtherPets
          : undefined,
      });
      return "Info actualizada";
    } catch (error) {
      console.log(error);
    }
  },
};
