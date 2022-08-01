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
      petProtocol: Upload
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
    type File {
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
      petProtocol: [File]
      isAvailableToBeAdopted: Boolean
    }
    type AdoptedCuestionairePlusUser {
      id: ID
      userId: User!
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
      petProtocol: [File]
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
    type AdopterCuestionairePlusUser {
      petPreferences: [String!]
      petAgePreferences: [String!]
      petGenderPreferences: [String!]
      petSizePreferences: [String!]
      haveDog: Boolean!
      haveCat: Boolean!
      hadPets: Boolean!
      hadPetsDate: String
      hadPetsValue: String
      havePets: Boolean!
      isChildren: Boolean!
      isAvailableToAdopt: Boolean
      numberOfCats: Int
      numberOfDogs: Int
      numberOfDays: Int
      numberOfMonths: Int
      numberOfYears: Int
      reasonToAdopt: String!
      isAgreeWithProtocol: Boolean!
      id: ID!
      userId: User!
    }
    type AdopterInfo {
      userInfo: User
      adopterInfo: AdopterCuestionaire
    }
    type Like {
      petId: AdoptedCuestionairePlusUser!
      userId: User!
      date: String!
    }
    type ReturnLike {
      likes: [Like!]
      numOfLikes: Int!
    }
    type LikeUser {
      userId: User!
      likedUserId: AdopterCuestionairePlusUser!
      date: String!
      # adopterCuestionaire: AdopterCuestionaire!
    }
    type ReturnLikeUser {
      likes: [LikeUser!]
      numOfLikes: Int!
    }
    type RandomPets {
      pets: [AdoptedCuestionaire!]
      numOfLikes: Int!
    }
    type RandomUsers {
      users: [AdopterCuestionairePlusUser]
      numOfLikes: Int!
    }
    type Match {
      id: ID!
      adopterInfo: User!
      petOwnerInfo: User!
      petInvolved: AdoptedCuestionaire!
    }

    type NotificationInfo {
      senderUser: User!
      receiverUser: User!
    }

    type Messages {
      id: ID!
      from: String!
      to: String!
      body: String!
    }

    type Chat {
      id: ID!
      receiver: String!
      sender: String!
    }
    type Query {
      getAdopterInfo(id: String!): AdopterInfo!
      getAdoptedInfo(id: String!): [AdoptedCuestionaire!]
      getRandomPet(userId: String!): RandomPets!
      getRandomAdopter(userId: String!): RandomUsers
      getPetsLikes(userId: String!): ReturnLike!
      getUserLikes(userId: String!): ReturnLikeUser!
      getPetsTrashLikes(userId: String!): ReturnLike!
      getUsersTrashLikes(userId: String!): ReturnLikeUser!
      getMatches(userId: String!): [Match!]
      getChat(userId: String!, partnerId: String!): [Messages!]
      getChatList(userId: String!): [Chat!]
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
      addProfilePetPicture(id: String!, petProfilePicture: Upload!): String!
      deletePetInfo(petId: String!): String!
      editUserInfo(id: String!, editInput: EditInput!): String!
      updateAdopterStatus(id: String!, userStatus: Boolean!): String!
      updateAdoptedStatus(id: String!, petStatus: Boolean!): String!
      likePet(petId: String!, userId: String!): String!
      likeUser(userId: String!, likedUserId: String!): String!
      dislikePet(petId: String!, userId: String!): String!
      dislikeUser(userId: String!, likedUserId: String!): String!
      deleteLike(petId: String!, userId: String!): String!
      trashLike(petId: String!, userId: String!): String!
      deleteLikeUser(userId: String!, likedUserId: String!): String!
      trashLikeUser(userId: String!, likedUserId: String!): String!
      reverseTrashLike(petId: String!, userId: String!): String!
      reverseTrashLikeUser(userId: String!, likedUserId: String!): String!
      addProtocolFile(
        id: String!
        protocolFile: Upload!
        fileName: String!
      ): String!
      sendMessage(body: String!, to: String!, userId: String!): Messages
      deleteMatch(matchId: String!): String!
      addExpoToken(id: String!, expoToken: String!): String!
    }
    type Subscription {
      messages(userId: String!): Messages!
      pushNotifications(userId: String!): NotificationInfo!
    }
  `,
};
