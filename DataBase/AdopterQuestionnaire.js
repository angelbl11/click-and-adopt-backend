const { model, Schema } = require("mongoose");

const schema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  haveDog: {
    required: true,
    type: Boolean,
  },

  haveCat: {
    required: true,
    type: Boolean,
  },

  hadPets: {
    required: true,
    type: Boolean,
  },

  hadPetsDate: {
    required: false,
    type: String,
  },

  hadPetsValue: {
    required: false,
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
    required: false,
    type: Number,
  },

  numberOfDogs: {
    required: false,
    type: Number,
  },

  numberOfDays: {
    required: false,
    type: Number,
  },

  numberOfMonths: {
    required: false,
    type: Number,
  },

  numberOfYears: {
    required: false,
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
