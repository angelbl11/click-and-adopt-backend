const { model, Schema } = require("mongoose");

const schema = new Schema({
	userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "User",
	},

	likedUserId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "AdopterQuestionnaire",
	},

	date: {
		required: true,
		type: String,
	},
});

module.exports = {
	DislikeUser: model("DislikeUser", schema),
};
