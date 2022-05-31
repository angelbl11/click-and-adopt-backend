const { gql } = require("apollo-server-core");

module.exports = {
  typeDefinitions: gql`
    scalar Upload

    input LoginInput {
      email: String!
      password: String!
    }

    input EditInput {
      email: String
      age: Int
      fullName: String
    }

    input RegisterInput {
      account: String!
      age: Int!
      email: String!
      fullName: String!
      password: String!
      repeatPassword: String!
    }

    input AdoptedQuestionnaireInput {
      userId: ID!
      adoptedPetName: String!
      ageOfAdoptedPet: String!
      genderOfAdoptedPet: String!
      typeOfAdoptedPet: String!
      adoptedPetDescription: String!
      adoptedPetProtocol: String!
      coexistenceWithOtherPets: [String!]
      isHealthyWithKids: Boolean!
      isHealthyWithOtherPets: Boolean!
      petPicture: Upload
      isAvailableToBeAdopted: Boolean
    }

    input AdopterQuestionnaireInput {
      userId: ID!
      haveDog: Boolean!
      haveCat: Boolean!
      hadPets: Boolean!
      hadPetsDate: String
      hadPetsValue: String
      havePets: Boolean!
      isChildren: Boolean!
      numberOfCats: Int
      numberOfDogs: Int
      numberOfDays: Int
      numberOfMonths: Int
      numberOfYears: Int
      petPreferences: [String!]
      reasonToAdopt: String!
      isAgreeWithProtocol: Boolean!
      petAgePreferences: [String!]
      petGenderPreferences: [String!]
      petSizePreferences: [String!]
      isAvailableToAdopt: Boolean
    }

    type Picture {
      filename: String
      mimetype: String
      encoding: String
    }

    type User {
      id: String!
      account: String!
      age: Int!
      email: String!
      fullName: String!
      password: String!
      token: String
      profilePicture: Picture
    }

    type AdoptedCuestionaire {
      id: ID
      userId: ID!
      adoptedPetName: String!
      ageOfAdoptedPet: String!
      genderOfAdoptedPet: String!
      typeOfAdoptedPet: String!
      adoptedPetDescription: String!
      adoptedPetProtocol: String!
      coexistenceWithOtherPets: [String!]
      isHealthyWithKids: Boolean!
      isHealthyWithOtherPets: Boolean!
      petPicture: Picture
      isAvailableToBeAdopted: Boolean
    }

    type AdopterCuestionaire {
      userId: ID!
      id: ID!
      haveDog: Boolean!
      haveCat: Boolean!
      hadPets: Boolean!
      hadPetsDate: String
      hadPetsValue: String
      havePets: Boolean!
      isChildren: Boolean!
      numberOfCats: Int
      numberOfDogs: Int
      numberOfDays: Int
      numberOfMonths: Int
      numberOfYears: Int
      petPreferences: [String!]
      reasonToAdopt: String!
      isAgreeWithProtocol: Boolean!
      petAgePreferences: [String!]
      petGenderPreferences: [String!]
      petSizePreferences: [String!]
      isAvailableToAdopt: Boolean
    }

    type AdopterInfo {
      userInfo: User
      adopterInfo: AdopterCuestionaire
    }

    type Query {
      sayHi: String!
      getAdopterInfo(id: String!): AdopterInfo!
      getAdoptedInfo(id: String!): [AdoptedCuestionaire!]
    }

    type Mutation {
      register(registerInput: RegisterInput!): User!
      answerAdoptedQuestionnaire(
        adoptedQuestionnaireInput: AdoptedQuestionnaireInput!
      ): String!
      answerAdopterQuestionnaire(
        adopterQuestionnaireInput: AdopterQuestionnaireInput!
      ): String!
      login(loginInput: LoginInput!): User!
      addProfilePicture(id: String!, profilePicture: Upload!): String!
      scanPicture(url: String!): String!
      addProfilePetPicture(id: String!, petProfilePicture: Upload!): String!
      deletePetInfo(petId: String!): String!
      editUserInfo(id: String!, editInput: EditInput!): String!
      updateAdopterStatus(id: String!, userStatus: Boolean!): String!
      updateAdoptedStatus(id: String!, petStatus: Boolean!): String!
    }
  `,
};
