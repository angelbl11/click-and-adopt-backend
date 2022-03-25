const { gql } = require("apollo-server-core");

module.exports = {
	typeDefinitions: gql`
		type User {
			id: String!
			account: String!
			age: Int!
			email: String!
			fullName: String!
			password: String!
			token: String!
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
		}

		input AdopterQuestionnaireInput {
			userId: ID!
			actualPets: [String!]
			hadPets: Boolean!
			hadPetsDate: String!
			hadPetsValue: String!
			havePets: Boolean!
			isChildren: Boolean!
			numberOfCats: Int!
			numberOfDogs: Int!
			numberOfDays: Int!
			numberOfMonths: Int!
			numberOfYears: Int!
			petPreferences: [String!]
			reasonToAdopt: String!
			isAgreeWithProtocol: Boolean!
			petAgePreferences: [String!]
			petGenderPreferences: [String!]
			petSizePreferences: [String!]
		}

		input LoginInput {
			email: String!
			password: String!
		}

		type Query {
			sayHi: String!
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
		}
	`,
};
