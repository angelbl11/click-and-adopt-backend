const { model, Schema } = require("mongoose");

const schema = new Schema({
	adopterInfo: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	petOwnerInfo: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	petInvolved: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "AdoptedQuestionnaire",
	},
});

module.exports = {
	Match: model("Match", schema),
};
