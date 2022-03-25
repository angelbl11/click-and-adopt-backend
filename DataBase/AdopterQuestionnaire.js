const { model, Schema } = require("mongoose");

const schema = new Schema({
	userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	actualPets: [
		{
			required: false,
			type: String,
		},
	],

	hadPets: {
		required: true,
		type: Boolean,
	},

	hadPetsDate: {
		required: true,
		type: String,
	},

	hadPetsValue: {
		required: true,
		type: String,
	},

	havePets: {
		required: true,
		type: Boolean,
	},

	isChildren: {
		required: true,
		type: Boolean,
	},

	numberOfCats: {
		required: true,
		type: Number,
	},

	numberOfDogs: {
		required: true,
		type: Number,
	},

	numberOfDays: {
		required: true,
		type: Number,
	},

	numberOfMonths: {
		required: true,
		type: Number,
	},

	numberOfYears: {
		required: true,
		type: Number,
	},

	petPreferences: [
		{
			type: String,
			required: true,
		},
	],

	reasonToAdopt: {
		required: true,
		type: String,
	},

	isAgreeWithProtocol: {
		type: Boolean,
		required: true,
	},

	petAgePreferences: [
		{
			type: String,
			required: true,
		},
	],

	petGenderPreferences: [
		{
			type: String,
			required: true,
		},
	],

	petSizePreferences: [
		{
			type: String,
			required: true,
		},
	],
});

module.exports = {
	AdopterQuestionnarie: model("AdopterQuestionnaire", schema),
};
