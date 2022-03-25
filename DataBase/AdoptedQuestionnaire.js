const { model, Schema } = require("mongoose");

const schema = new Schema({
	userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	adoptedPetName: {
		required: true,
		type: String,
	},

	ageOfAdoptedPet: {
		required: true,
		type: String,
	},

	genderOfAdoptedPet: {
		required: true,
		type: String,
	},

	typeOfAdoptedPet: {
		required: true,
		type: String,
	},

	adoptedPetDescription: {
		required: true,
		type: String,
	},

	adoptedPetProtocol: {
		required: true,
		type: String,
	},

	coexistenceWithOtherPets: [
		{
			required: false,
			type: String,
		},
	],

	isHealthyWithKids: {
		required: true,
		type: Boolean,
	},

	isHealthyWithOtherPets: {
		required: true,
		type: Boolean,
	},
});

module.exports = {
	AdoptedQuestionnarie: model("AdoptedQuestionnaire", schema),
};
