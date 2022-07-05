const { model, Schema } = require("mongoose");

const schema = new Schema({
	petId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "AdoptedQuestionnaire",
	},

	userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	date: {
		required: true,
		type: String,
	},
});

module.exports = {
	LikeTrash: model("LikeTrash", schema),
};
